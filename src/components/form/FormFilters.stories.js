import UidsButton from '../button/Button.vue';
import UidsFormFieldset from '../form/FormFieldset.vue';
import UidsFormCollapsible from '../form/FormCollapsible.vue';

import '../../scss/components/form.scss';
import '../../scss/components/form-filters.scss';
import '../../scss/components/_headline.scss';
import '../../scss/layout/_flexbox_showcase.scss';

export default {
  title: 'Components/Form/Filters',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      source: {
        code: null
      },
    },
  },
  argTypes: {
    collapsible: {
      name: 'Collapsible',
    }
  },
};

const ExampleFields = `
            <div class="form-item form--filter__filters--details">
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
                        <label for="edit-field-event-genre-value-childrens--Y2idzqPWjuo"
                               class="option">Children's</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-essay--qn92WZNFxVQ"
                               name="field_event_genre_value[Essay]" value="Essay" class="form-checkbox">
                        <label for="edit-field-event-genre-value-essay--qn92WZNFxVQ" class="option">Essay</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-fantasy--qsdFbcezUn0"
                               name="field_event_genre_value[Fantasy]" value="Fantasy" class="form-checkbox">
                        <label for="edit-field-event-genre-value-fantasy--qsdFbcezUn0"
                               class="option">Fantasy</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-fiction--F547iWBi4wg"
                               name="field_event_genre_value[Fiction]" value="Fiction" class="form-checkbox">
                        <label for="edit-field-event-genre-value-fiction--F547iWBi4wg"
                               class="option">Fiction</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A"
                               name="field_event_genre_value[HybridForms]" value="HybridForms"
                               class="form-checkbox">
                        <label for="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A" class="option">Hybrid
                          Forms</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-memoir--HVUn8CLgzqg"
                               name="field_event_genre_value[Memoir]" value="Memoir" class="form-checkbox">
                        <label for="edit-field-event-genre-value-memoir--HVUn8CLgzqg" class="option">Memoir</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-middlegrade--ueW_97yE7nY"
                               name="field_event_genre_value[MiddleGrade]" value="MiddleGrade"
                               class="form-checkbox">
                        <label for="edit-field-event-genre-value-middlegrade--ueW_97yE7nY" class="option">Middle
                          Grade</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-nonfiction--RO3rViX_wJI"
                               name="field_event_genre_value[Nonfiction]" value="Nonfiction" class="form-checkbox">
                        <label for="edit-field-event-genre-value-nonfiction--RO3rViX_wJI"
                               class="option">Nonfiction</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-novel--nY9Utkyye3w"
                               name="field_event_genre_value[Novel]" value="Novel" class="form-checkbox">
                        <label for="edit-field-event-genre-value-novel--nY9Utkyye3w" class="option">Novel</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-playwriting--nTE1KzbGVyM"
                               name="field_event_genre_value[Playwriting]" value="Playwriting"
                               class="form-checkbox">
                        <label for="edit-field-event-genre-value-playwriting--nTE1KzbGVyM" class="option">Playwriting</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-poetry--YJd6UDHH86E"
                               name="field_event_genre_value[Poetry]" value="Poetry" class="form-checkbox">
                        <label for="edit-field-event-genre-value-poetry--YJd6UDHH86E" class="option">Poetry</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44"
                               name="field_event_genre_value[ScienceFiction]" value="ScienceFiction"
                               class="form-checkbox">
                        <label for="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44" class="option">Science
                          Fiction</label>
                      </div>

                      <div class="form-type-checkbox form-item">
                        <input type="checkbox" id="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                               name="field_event_genre_value[Screenwriting]" value="Screenwriting"
                               class="form-checkbox">
                        <label for="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                               class="option">Screenwriting</label>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </details>
            </div>

            <div class="form-item">
              <label for="membership">Membership</label>
              <select name="membership">
                <option selected="" value="">Membership</option>
                <option value="PRIMARY">Primary</option>
                <option value="SECONDARY">Secondary</option>
              </select>
            </div>

            <div class="form-item">
              <label for="person-type">Person type</label>
              <select name="person-type">
                <option value="All" selected="selected">- Any -</option>
                <option value="emeritus">Emeritus</option>
                <option value="faculty">Faculty</option>
                <option value="grad_assistant">Graduate Assistant</option>
                <option value="phd_candidate">PhD Candidate</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div class="form-item">
              <label for="status">Status</label>
              <select name="status">
                <option value="All" selected="selected">- Any -</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
              </select>
            </div>
`;

const Template = {
  render: (args) => ({
    components: { UidsButton, UidsFormFieldset, UidsFormCollapsible },
    setup() {
      return { args };
    },
    computed: {
      filterComponent() {
        if (args.collapsible) {
          return 'uids-form-collapsible';
        }
        return 'uids-form-fieldset';
      },
    },
    template: `
      <div class="layout-container">
        <form class="form" action="/" method="get"
              accept-charset="UTF-8">

          <component :is="filterComponent" class="form--inline form--small form--compact"
                              label="Filters"
          >

            <div class="form-item">
              <label for="edit-college">College</label>
              <select id="edit-college" name="college" autocomplete="off">
                <option selected="" value="17">Carver College of Medicine</option>
              </select>
            </div>

            <div class=" form-item">
              <label for="edit-department">Department</label>
              <select id="edit-department" name="department" autocomplete="off">
                <option selected="" value="">All Departments</option>
                <option value="3100">Anatomy and Cell Biology</option>
                <option value="3200">Anesthesia</option>
                <option value="3110">Biochemistry and Molecular Biology</option>
                <option value="3273">Cardiothoracic Surgery</option>
                <option value="3205">Dermatology</option>
                <option value="3272">Emergency Medicine</option>
                <option value="3210">Family Medicine</option>
                <option value="3215">Internal Medicine</option>
                <option value="3120">Microbiology and Immunology</option>
                <option value="3140">Molecular Physiology and Biophysics</option>
                <option value="3220">Neurology</option>
                <option value="3130">Neuroscience and Pharmacology</option>
                <option value="3271">Neurosurgery</option>
                <option value="3225">Obstetrics and Gynecology</option>
                <option value="3230">Ophthalmology and Visual Sciences</option>
                <option value="3240">Orthopedics and Rehabilitation</option>
                <option value="3245">Otolaryngology</option>
                <option value="3250">Pathology</option>
                <option value="3255">Pediatrics</option>
                <option value="3325">Physical Therapy and Rehabilitation Science</option>
                <option value="3330">Physician Assistant</option>
                <option value="3260">Psychiatry</option>
                <option value="3266">Radiation Oncology</option>
                <option value="3265">Radiology</option>
                <option value="3270">Surgery</option>
                <option value="3275">Urology</option>
              </select>
            </div>

            <div class=" form-item">
              <label for="edit-membership">Membership</label>
              <select id="edit-membership" name="membership" autocomplete="off">
                <option selected="" value="">All</option>
                <option value="PRIMARY">Primary</option>
                <option value="SECONDARY">Secondary</option>
              </select>
            </div>

            <div class=" form-item">
              <label for="edit-person-type">Person type</label>
              <select id="edit-person-type" name="type">
                <option value="All" selected="selected">- Any -</option>
                <option value="emeritus">Emeritus</option>
                <option value="faculty">Faculty</option>
                <option value="grad_assistant">Graduate Assistant</option>
                <option value="phd_candidate">PhD Candidate</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div class=" form-item">
              <label for="edit-status">Status</label>
              <select id="edit-status" name="status">
                <option value="All" selected="selected">- Any -</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
              </select>
            </div>
          </component>

          <div class="form--flex form--compact">
            <div class="form-item">
              <label class="element-invisible" for="edit-search">Search</label>
              <input type="text" id="edit-search" name="search" value="" size="30" maxlength="128"
                     placeholder="Search directory">
            </div>
            <div class="form-actions">
              <button type="submit" name="reset" value="Reset" class="bttn bttn--secondary">
                <span>Reset</span>
              </button>
              <button type="submit" name="search" value="Search" class="bttn bttn--primary">
                <span>Search</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    `,
  }),
}

export const ExposedFilterForm = {
  ...Template,
  args: {
    collapsible: false,
  }
}
