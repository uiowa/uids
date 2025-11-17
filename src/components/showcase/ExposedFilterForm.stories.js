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

      <div class="filter-form element--margin__bottom--extra element--margin__top--extra">
        <form class="uids-form form" action="/events" method="get" id="views-exposed-form-events-page-upcoming" accept-charset="UTF-8" data-drupal-form-fields="">

          <div class="filter-box  ">
            <span class="label"> <span>Filters</span> </span>
            <div class="form-item form-item--details">
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

            <div class="select-dropdown form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
              <label class="element-invisible" for="edit-field-event-performer-target-id-1">Membership</label>
              <select id="membership-type-454080" autocomplete="off" class="disabled:cursor-not-allowed sm rounded text-ui-gray-900 text-opacity-40" size="0">
                <option selected="" value="">All</option>
                <option value="PRIMARY">Primary</option>
                <option value="SECONDARY">Secondary</option>
              </select>
            </div>

            <div class="select-dropdown form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
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

            <div class="select-dropdown form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
              <label class="element-invisible" for="edit-field-event-performer-target-id-1">Status</label>
              <select id="edit-type" name="type" class="form-select">
                <option value="All" selected="selected">- Any -</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
              </select>
            </div>

          </div>

          <div class="search-actions">
            <div class="form-item form-type-textfield form-item-combine flex--1">
              <label class="element-invisible" for="edit-combine">Search</label>
              <input type="text" id="edit-combine" name="combine" value="" size="30" maxlength="128" placeholder="Search directory" class="form-text">
            </div>


            <div class="filter-form__actions form-wrapper" id="edit-actions">
              <input type="submit" id="edit-submit" value="Search" class="bttn bttn--secondary">

              <!--    <input type="submit" id="edit-reset" name="reset" value="Reset" class="bttn bttn&#45;&#45;secondary form-submit">-->
            </div>

          </div>

        </form>
      </div>
    </div>
    `,
  }),
}

export const ExposedFilterForm = {
  ...Template,
}
