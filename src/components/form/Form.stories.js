import UidsForm from './Form.vue';
import ExampleSearch from './ExampleSearch.vue';

export default {
  title: 'Components/Form',
  parameters: {
    docs: {
      source: {
        code: null
      },
    }
  },
  component: UidsForm,
  tags: ['autodocs'],
  argTypes: {
    section1_compact: {
      name: 'Compact',
    },
    section1_large: {
      name: 'Large',
    },
    section1_inline: {
      name: 'Inline',
    },
    section1_flex: {
      name: 'Flex',
    },
  }
};

const SearchBarTemplate = {
  render: (args) => ({
    components: { ExampleSearch },
    setup() {
      return { args };
    },
    template: `
      <div class="layout-container">
        <example-search></example-search>
      </div>
    `
  }),
}

export const SearchBar = {
  ...SearchBarTemplate,
}

const Template = {
  render: (args) => ({
    components: {},
    setup() {
      return { args };
    },
    computed: {
      formSection1Classes() {
        let classes = [];
        if (args.section1_large) {
          classes.push('form--large');
        }
        if (args.section1_compact) {
          classes.push('form--compact');
        }
        if (args.section1_inline) {
          classes.push('form--inline');
        }
        if (args.section1_flex) {
          classes.push('form--flex');
        }
        return classes;
      },
    },
    template: `
<div class="layout-container">
  <form class="form" method="POST" action="" :class="formSection1Classes">


      <div class="form-item">
        <label class="form-required" for="last-name">Text</label>
        <input id="last-name" maxlength="50" type="text">
        <div class="description">Description</div>
      </div>

      <div class="form-item">
        <label class="form-required" for="email">Email</label>
        <input id="email" maxlength="255" type="email">
      </div>

      <div class="form-item">
        <label for="home-phone">Phone</label>
        <input id="home-phone" maxlength="12" type="tel">
      </div>

    <div class="form-item">
      <label>Radio</label>
      <div class="form-type-radio form-item">
        <input id="text-permission-yes" type="radio" name="permissionToText" value="true">
        <label for="text-permission-yes" class="radio">Yes</label>
      </div>
      <div class="form-type-radio form-item">
        <input id="text-permission-no" type="radio" name="permissionToText" value="false">
        <label for="text-permission-no" class="radio">No</label>
      </div>
    </div>

    <div class="form-item">
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
    </div>

    <div class="form-item">
      <label class="form-required" for="birth-date">Date</label>
      <input id="birth-date" type="date">
    </div>


    <label for="home-phone">Multi select checkbox</label>
    <details class="form-item form__details--multi-select">
      <summary>Genre<span class="summary"></span></summary>
      <div class="details-wrapper">
        <div class="form-checkboxes">
          <fieldset class="details-multi-select-checkboxes">
            <legend class="visually-hidden">Select one or more genres</legend>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-childrens--Y2idzqPWjuo"
                     name="field_event_genre_value[Childrens]" value="Childrens" class="form-checkbox">
              <label for="edit-field-event-genre-value-childrens--Y2idzqPWjuo" class="option">Children's</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-essay--qn92WZNFxVQ"
                     name="field_event_genre_value[Essay]" value="Essay" class="form-checkbox">
              <label for="edit-field-event-genre-value-essay--qn92WZNFxVQ" class="option">Essay</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-fantasy--qsdFbcezUn0"
                     name="field_event_genre_value[Fantasy]" value="Fantasy" class="form-checkbox">
              <label for="edit-field-event-genre-value-fantasy--qsdFbcezUn0" class="option">Fantasy</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-fiction--F547iWBi4wg"
                     name="field_event_genre_value[Fiction]" value="Fiction" class="form-checkbox">
              <label for="edit-field-event-genre-value-fiction--F547iWBi4wg" class="option">Fiction</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A"
                     name="field_event_genre_value[HybridForms]" value="HybridForms" class="form-checkbox">
              <label for="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A" class="option">Hybrid Forms</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-memoir--HVUn8CLgzqg"
                     name="field_event_genre_value[Memoir]" value="Memoir" class="form-checkbox">
              <label for="edit-field-event-genre-value-memoir--HVUn8CLgzqg" class="option">Memoir</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-middlegrade--ueW_97yE7nY"
                     name="field_event_genre_value[MiddleGrade]" value="MiddleGrade" class="form-checkbox">
              <label for="edit-field-event-genre-value-middlegrade--ueW_97yE7nY" class="option">Middle Grade</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-nonfiction--RO3rViX_wJI"
                     name="field_event_genre_value[Nonfiction]" value="Nonfiction" class="form-checkbox">
              <label for="edit-field-event-genre-value-nonfiction--RO3rViX_wJI" class="option">Nonfiction</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-novel--nY9Utkyye3w"
                     name="field_event_genre_value[Novel]" value="Novel" class="form-checkbox">
              <label for="edit-field-event-genre-value-novel--nY9Utkyye3w" class="option">Novel</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-playwriting--nTE1KzbGVyM"
                     name="field_event_genre_value[Playwriting]" value="Playwriting" class="form-checkbox">
              <label for="edit-field-event-genre-value-playwriting--nTE1KzbGVyM" class="option">Playwriting</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-poetry--YJd6UDHH86E"
                     name="field_event_genre_value[Poetry]" value="Poetry" class="form-checkbox">
              <label for="edit-field-event-genre-value-poetry--YJd6UDHH86E" class="option">Poetry</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44"
                     name="field_event_genre_value[ScienceFiction]" value="ScienceFiction" class="form-checkbox">
              <label for="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44" class="option">Science
                Fiction</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" id="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                     name="field_event_genre_value[Screenwriting]" value="Screenwriting" class="form-checkbox">
              <label for="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                     class="option">Screenwriting</label>
            </div>
          </fieldset>
        </div>
      </div>
    </details>

    <div class="form-item form-item-multiselect">
      <label for="multiselect">Multi select</label>
      <select id="multiselect" multiple="multiple" name="multiselect[]" class="form-select">
        <option value="High School">High School</option>
        <option value="Associate Degree">Associate Degree</option>
        <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
        <option value="Some College">Some College</option>
      </select>
    </div>

    <fieldset>
      <legend>
        <span class="fieldset-legend">Switch checkbox</span>
      </legend>
      <div class="fieldset-wrapper">
        <div class="form-type-checkbox--switch">
          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-business" type="checkbox" name="academic_group[251]" value="251">
            <label for="academic-business" class="checkbox">Business, Economics, and Management</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-education" type="checkbox" name="academic_group[261]" value="261">
            <label for="academic-education" class="checkbox">Education</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-engineering" type="checkbox" name="academic_group[256]" value="256">
            <label for="academic-engineering" class="checkbox">Engineering and Computing</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-health" type="checkbox" name="academic_group[286]" value="286">
            <label for="academic-health" class="checkbox">Health Sciences</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-languages" type="checkbox" name="academic_group[271]" value="271">
            <label for="academic-languages" class="checkbox">Languages, Culture, and Society</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-life-sciences" type="checkbox" name="academic_group[276]" value="276">
            <label for="academic-life-sciences" class="checkbox">Life and Natural Sciences</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-math" type="checkbox" name="academic_group[266]" value="266">
            <label for="academic-math" class="checkbox">Math and Quantitative Sciences</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-preprofessional" type="checkbox" name="academic_group[301]"
                   value="301">
            <label for="academic-preprofessional" class="checkbox">Preprofessional Programs</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-social-sciences" type="checkbox" name="academic_group[291]"
                   value="291">
            <label for="academic-social-sciences" class="checkbox">Social Sciences and Policy</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-visual-arts" type="checkbox" name="academic_group[296]" value="296">
            <label for="academic-visual-arts" class="checkbox">Visual and Performing Arts</label>
          </div>

          <div class="form-type-checkbox form-item">
            <input role="switch" id="academic-writing" type="checkbox" name="academic_group[281]" value="281">
            <label for="academic-writing" class="checkbox">Writing, Communications, Literature, and Media</label>
          </div>

          <div class="description">Select your academic interests</div>
        </div>
      </div>
    </fieldset>

    <div class="form-item">
      <label for="disabled-field">Disabled</label>
      <input id="disabled-field" type="text" name="disabled" value="" size="60" maxlength="255"
             placeholder="This field is disabled" disabled="disabled">
    </div>

    <div class="form-item">
      <label for="readonly-field">Readonly</label>
      <input id="readonly-field" type="text" name="readonly" value="" size="60" maxlength="255"
             placeholder="Readonly" readonly="readonly">
    </div>

    <div class="form-item">
      <label for="edit-textarea">Textarea</label>
      <textarea id="edit-textarea" name="textarea" rows="5" cols="60"
                aria-describedby="edit-textarea--description"></textarea>
      <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
    </div>

    <fieldset>
      <legend>
        <span class="fieldset-legend">Checkbox</span>
      </legend>
      <div>
        <div class="form-type-checkbox form-item">
          <input id="financial-aid" type="checkbox" value="FINANCIAL_AID">
          <label for="financial-aid" class="checkbox">Costs & Financial Aid</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="marching-band" type="checkbox" value="MARCHING_BAND">
          <label for="marching-band" class="checkbox">Hawkeye Marching Band</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="rotc-air-force" type="checkbox" value="ROTC_AIR_FORCE">
          <label for="rotc-air-force" class="checkbox">ROTC - Air Force (Aerospace Studies)</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="rotc-army" type="checkbox" value="ROTC_ARMY">
          <label for="rotc-army" class="checkbox">ROTC - Army (Military Science)</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="study-abroad" type="checkbox" value="STUDY_ABROAD">
          <label for="study-abroad" class="checkbox">Study Abroad</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="band" type="checkbox" value="BAND">
          <label for="band" class="checkbox">University Concert Bands and Jazz Bands</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="honors" type="checkbox" value="HONORS">
          <label for="honors" class="checkbox">University Honors Program</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input id="veteran-services" type="checkbox" value="VETERAN_SERVICES">
          <label for="veteran-services" class="checkbox">Veteran & Military Connected Student Services</label>
        </div>
      </div>
    </fieldset>


    <fieldset>
      <legend>
        <span class="fieldset-legend">Checkbox inline</span>
      </legend>
      <div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="financial-aid-2" type="checkbox" value="FINANCIAL_AID">
          <label for="financial-aid-2" class="checkbox">Costs & Financial Aid</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="marching-band-2" type="checkbox" value="MARCHING_BAND">
          <label for="marching-band-2" class="checkbox">Hawkeye Marching Band</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="rotc-air-force-2" type="checkbox" value="ROTC_AIR_FORCE">
          <label for="rotc-air-force-2" class="checkbox">ROTC - Air Force (Aerospace Studies)</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="rotc-army-2" type="checkbox" value="ROTC_ARMY">
          <label for="rotc-army-2" class="checkbox">ROTC - Army (Military Science)</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="study-abroad-2" type="checkbox" value="STUDY_ABROAD">
          <label for="study-abroad-2" class="checkbox">Study Abroad</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="band-2" type="checkbox" value="BAND">
          <label for="band-2" class="checkbox">University Concert Bands and Jazz Bands</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="honors-2" type="checkbox" value="HONORS">
          <label for="honors-2" class="checkbox">University Honors Program</label>
        </div>
        <div class="form-type-checkbox form-type-checkbox--side form-item">
          <input id="veteran-services-2" type="checkbox" value="VETERAN_SERVICES">
          <label for="veteran-services-2" class="checkbox">Veteran & Military Connected Student Services</label>
        </div>
      </div>
    </fieldset>
  </form>
</div>
    `,
  }),
}

export const KitchenSink = {
  ...Template,
  args: {
    section1_large: false,
    section1_compact: false,
    section1_inline: false,
    section1_flex: false,
  }
}
