import UidsForm from './Form.vue'
import FormDocs from './FormDocs.mdx';

export default {
  title: 'Components/Form',
  parameters: {
    docs: {
      source: {
        code: null,
      },
      page: FormDocs,
    },
  },
  component: UidsForm,
  tags: ['autodocs'],
  argTypes: {
  },
};

const BasicFormTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: '<uids-form v-bind="args" />',
});

export const Form = BasicFormTemplate.bind({});
Form.args = {};

const MiscTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: `
    <form class="uids-form" method="POST" action="">
      <div class="form">
        <h2 class="headline headline--serif headline--underline">Miscellaneous elements</h2>
        <details class="form-item details-multi-select">
          <summary>Genre<span class="summary"></span></summary>
          <div class="details-wrapper">
            <div class="form-checkboxes">
              <fieldset class="details-multi-select-checkboxes">
                <legend class="visually-hidden">Select one or more genres</legend>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-childrens--Y2idzqPWjuo" name="field_event_genre_value[Childrens]" value="Childrens" class="form-checkbox">
                  <label for="edit-field-event-genre-value-childrens--Y2idzqPWjuo" class="option">Children's</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-essay--qn92WZNFxVQ" name="field_event_genre_value[Essay]" value="Essay" class="form-checkbox">
                  <label for="edit-field-event-genre-value-essay--qn92WZNFxVQ" class="option">Essay</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-fantasy--qsdFbcezUn0" name="field_event_genre_value[Fantasy]" value="Fantasy" class="form-checkbox">
                  <label for="edit-field-event-genre-value-fantasy--qsdFbcezUn0" class="option">Fantasy</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-fiction--F547iWBi4wg" name="field_event_genre_value[Fiction]" value="Fiction" class="form-checkbox">
                  <label for="edit-field-event-genre-value-fiction--F547iWBi4wg" class="option">Fiction</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A" name="field_event_genre_value[HybridForms]" value="HybridForms" class="form-checkbox">
                  <label for="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A" class="option">Hybrid Forms</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-memoir--HVUn8CLgzqg" name="field_event_genre_value[Memoir]" value="Memoir" class="form-checkbox">
                  <label for="edit-field-event-genre-value-memoir--HVUn8CLgzqg" class="option">Memoir</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-middlegrade--ueW_97yE7nY" name="field_event_genre_value[MiddleGrade]" value="MiddleGrade" class="form-checkbox">
                  <label for="edit-field-event-genre-value-middlegrade--ueW_97yE7nY" class="option">Middle Grade</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-nonfiction--RO3rViX_wJI" name="field_event_genre_value[Nonfiction]" value="Nonfiction" class="form-checkbox">
                  <label for="edit-field-event-genre-value-nonfiction--RO3rViX_wJI" class="option">Nonfiction</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-novel--nY9Utkyye3w" name="field_event_genre_value[Novel]" value="Novel" class="form-checkbox">
                  <label for="edit-field-event-genre-value-novel--nY9Utkyye3w" class="option">Novel</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-playwriting--nTE1KzbGVyM" name="field_event_genre_value[Playwriting]" value="Playwriting" class="form-checkbox">
                  <label for="edit-field-event-genre-value-playwriting--nTE1KzbGVyM" class="option">Playwriting</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-poetry--YJd6UDHH86E" name="field_event_genre_value[Poetry]" value="Poetry" class="form-checkbox">
                  <label for="edit-field-event-genre-value-poetry--YJd6UDHH86E" class="option">Poetry</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44" name="field_event_genre_value[ScienceFiction]" value="ScienceFiction" class="form-checkbox">
                  <label for="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44" class="option">Science Fiction</label>
                </div>

                <div class="form-type-checkbox form-item">
                  <input type="checkbox" id="edit-field-event-genre-value-screenwriting--3SCKNL7gdww" name="field_event_genre_value[Screenwriting]" value="Screenwriting" class="form-checkbox">
                  <label for="edit-field-event-genre-value-screenwriting--3SCKNL7gdww" class="option">Screenwriting</label>
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
          <div class="description">Select multiple school options</div>
        </div>

        <fieldset>
          <legend>
            <span class="fieldset-legend">Academic Interests</span>
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
                <input role="switch" id="academic-preprofessional" type="checkbox" name="academic_group[301]" value="301">
                <label for="academic-preprofessional" class="checkbox">Preprofessional Programs</label>
              </div>

              <div class="form-type-checkbox form-item">
                <input role="switch" id="academic-social-sciences" type="checkbox" name="academic_group[291]" value="291">
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
        <input id="disabled-field" type="text" name="disabled" value="" size="60" maxlength="255" placeholder="This field is disabled" disabled="disabled">
      </div>

      <div class="form-item">
        <label for="readonly-field">Readonly</label>
        <input id="readonly-field" type="text" name="readonly" value="" size="60" maxlength="255" placeholder="Readonly" readonly="readonly">
      </div>

      <div class="form-item">
        <label for="edit-textarea">Textarea</label>
        <textarea id="edit-textarea" name="textarea" rows="5" cols="60" aria-describedby="edit-textarea--description"></textarea>
        <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
      </div>

      <fieldset>
        <legend>
          <span class="fieldset-legend">Select any additional subjects that you would like to receive information about.</span>
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
      </div>
    </form>
  `,
});
export const MiscElements = MiscTemplate.bind({});
MiscElements.args = {};

const FlexboxLayoutTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: `
    <form class="uids-form" method="POST" action="">
      <div class="form">
        <div class="flex flex--wrap flex--gap__sm border element--padding__all--minimal element--margin__bottom--extra">
          <h2 class="headline headline--serif headline--underline flex--break">Flexbox example</h2>
          <div class="form-item flex--3">
            <label for="first-name">First Name</label>
            <input id="first-name" maxlength="50" type="text">
          </div>

          <div class="form-item flex--1">
            <label for="middle-name">Middle</label>
            <input id="middle-name" placeholder="Middle" maxlength="50" type="text">
          </div>

          <div class="form-item flex--3">
            <label for="last-name">Last Name</label>
            <input id="last-name" maxlength="50" type="text">
          </div>

          <div class="form-item flex--1">
            <label for="suffix">Suffix</label>
            <input id="suffix" placeholder="Jr, Sr, III" maxlength="50" type="text">
          </div>

          <div class="form-item flex--break">
            <label class="form-required" for="email">Email Address</label>
            <input id="email" maxlength="255" type="email">
          </div>

          <div class="form-item flex--12">
            <label for="home-phone">Home Phone</label>
            <input id="home-phone" maxlength="12" type="tel">
          </div>
        </div>
      </div>
    </form>
  `,
});
export const FlexboxLayout = FlexboxLayoutTemplate.bind({});
FlexboxLayout.args = {};

const GridLayoutTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: `
    <form class="uids-form" method="POST" action="">
      <div class="form">
        <h2 class="headline headline--serif headline--underline">Grid examples</h2>

        <div class="grid--twocol--50-50 grid--gap__sm">
          <div class="list-container__inner">
            <div class="form-item">
              <label for="first-name-grid">First Name</label>
              <input id="first-name-grid" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label for="last-name-grid">Last Name</label>
              <input id="last-name-grid" maxlength="50" type="text">
            </div>
          </div>
        </div>

        <div class="grid--threecol--33-34-33 grid--gap__sm">
          <div class="list-container__inner">
            <div class="form-item">
              <label for="first-name-grid2">First Name</label>
              <input id="first-name-grid2" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label for="middle-name-grid">Middle Name</label>
              <input id="middle-name-grid" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label for="last-name-grid2">Last Name</label>
              <input id="last-name-grid2" maxlength="50" type="text">
            </div>
          </div>
        </div>

        <div class="grid--twocol--50-50 grid--gap__sm bg--gray element--padding__all--minimal element--margin__bottom">
          <div class="list-container__inner">
            <div class="form-item">
              <label for="first-name-grid3">First Name</label>
              <input id="first-name-grid3" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label for="last-name-grid3">Last Name</label>
              <input id="last-name-grid3" maxlength="50" type="text">
            </div>
          </div>
        </div>

        <div class="grid--threecol--33-34-33 grid--gap__sm bg--gray element--padding__all--minimal element--margin__bottom--extra">
          <div class="list-container__inner">
            <div class="form-item">
              <label for="first-name-grid4">First Name</label>
              <input id="first-name-grid4" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label for="last-name-grid4">Last Name</label>
              <input id="last-name-grid4" maxlength="50" type="text">
            </div>

            <div class="form-item">
              <label class="form-required" for="email-grid">Email Address</label>
              <input id="email-grid" maxlength="255" type="email">
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
});
export const GridLayout = GridLayoutTemplate.bind({});
GridLayout.args = {};

const CompleteFormTemplate = (args) => ({
  components: { UidsForm },
  setup() {
    return { args };
  },
  template: `<uids-form />`,
});


