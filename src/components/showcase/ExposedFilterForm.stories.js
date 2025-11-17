import UidsButton from '../button/Button.vue';

import '../../scss/components/form.scss';
import '../../scss/components/form-filters.scss';
import '../../scss/components/_headline.scss';
import '../../scss/layout/_flexbox_showcase.scss';

export default {
  title: 'Showcase/Filters',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      source: {
        code: null
      },
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsButton },
    setup() {
      return { args };
    },
    template: `<div class="layout-container">
      <h1>Exposed Filter</h1>
      <div class="filter-form">
        <form class="uids-form form" action="/events" method="get" id="views-exposed-form-events-page-upcoming" accept-charset="UTF-8" data-drupal-form-fields="">

            <details class="filter-form__filters form-wrapper" id="edit-secondary" open="open">
              <summary role="button" aria-controls="edit-secondary" aria-expanded="true">Filters<span class="summary"></span></summary>
              <div class="details-wrapper">

                <div class="form-item form-type-date form-item-field-event-when-end-value">
                  <label class="element-invisible" for="edit-field-event-when-end-value">Departments</label>
                  <select autocomplete="off" class="disabled:cursor-not-allowed md text-ui-gray-900 text-opacity-40">
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

                <div class="form-item">
                  <label class="element-invisible"  for="home-phone">Multi select checkbox</label>
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
                </div>

                <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                  <label class="element-invisible" for="edit-field-event-performer-target-id-1">Membership</label>
                  <select id="membership-type-454080" autocomplete="off" class="disabled:cursor-not-allowed sm rounded text-ui-gray-900 text-opacity-40" size="0">
                    <option selected="" value="">All</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                  </select>
                </div>

                <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                  <label class="element-invisible" for="edit-field-event-performer-target-id-1">Person type</label>
                  <select id="edit-type" name="type" class="form-select">
                    <option value="All" selected="selected">- Any -</option>
                    <option value="emeritus">Emeritus</option>
                    <option value="faculty">Faculty</option>
                    <option value="grad_assistant">Graduate Assistant</option>
                    <option value="phd_candidate">PhD Candidate</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                  <label class="element-invisible" for="edit-field-event-performer-target-id-1">Status</label>
                  <select id="edit-type" name="type" class="form-select">
                    <option value="All" selected="selected">- Any -</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>

              </div>
            </details>


            <div class="form-item form-type-textfield form-item-combine">
              <label class="element-invisible" for="edit-combine">Search</label>
              <input type="text" id="edit-combine" name="combine" value="" size="30" maxlength="128" placeholder="Search directory" class="form-text">
            </div>



            <div class="filter-form__actions form-wrapper" id="edit-actions">
              <input type="submit" id="edit-submit" value="Search" class="button form-submit">
            </div>
        </form>
      </div>
    </div>`,
  }),
}

export const ExposedFilterForm = {
  ...Template,
}
