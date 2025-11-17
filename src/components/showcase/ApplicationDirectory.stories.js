import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';
import '../../scss/components/form.scss';
import '../../scss/components/pager.scss';
import '../../scss/components/form-filters.scss';
import '../../scss/layout/_flexbox.scss';
import '../../scss/layout/_grid.scss';

import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';
import UidsTable from '../table/Table.vue';
import UidsMenu from '../menu/Menu.vue';

export default {
  title: 'Showcase/Application',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null
      },
    },
  },
};

const horizontalMenuItems = [
  { label: 'Home', url: '#', icon: 'fas fa-house' },
  { label: 'Directories', url: '#', icon: 'fas fa-users', children: [] },
  { label: 'Reports', url: '#', icon: 'fas fa-file-lines' },
  { label: 'Roles', url: '#', icon: 'fas fa-user-gear' },
  { label: 'Contact', url: '#', icon: 'fas fa-mobile-screen' },
];

const Template = {
  render: (args) => ({
    components: { UidsButton, BrandBar, UidsTable, UidsMenu },
    setup() {
      return { args, horizontalMenuItems };
    },
    template: `
      <brand-bar
        :narrow='true'
        :healthcare='false'
      >
        <h1 class="site-name flex--10">Profiles</h1>
      </brand-bar>
      <nav class="menu--container">
        <div class="layout-container">
          <uids-menu
            variant="horizontal"
            :items="horizontalMenuItems"
            label="Main"
            top
          />
        </div>
      </nav>
      <div class="layout-container element--margin__top--extra">

        <div class="breadcrumb">
          Directory
        </div>
        <h1 class="headline headline--serif">University Directory</h1>

        <div class="main-panel">

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

          <uids-table
            summary="University Directory - Staff and Faculty Listing"
            caption="Directory Listing"
            :sticky="true"
            :highlight="true"
            :border="true"
          >
            <template #thead>
              <tr>
                <th scope="col">Actions</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Title</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </template>
            <template #tbody>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>John Smith</td>
                <td>Computer Science</td>
                <td>Professor</td>
                <td>john.smith@university.edu</td>
                <td>(319) 555-0123</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Jane Doe</td>
                <td>Mathematics</td>
                <td>Associate Professor</td>
                <td>jane.doe@university.edu</td>
                <td>(319) 555-0124</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Bob Johnson</td>
                <td>Physics</td>
                <td>Department Chair</td>
                <td>bob.johnson@university.edu</td>
                <td>(319) 555-0125</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Alice Williams</td>
                <td>Biology</td>
                <td>Research Scientist</td>
                <td>alice.williams@university.edu</td>
                <td>(319) 555-0126</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Michael Chen</td>
                <td>Chemistry</td>
                <td>Assistant Professor</td>
                <td>michael.chen@university.edu</td>
                <td>(319) 555-0127</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Sarah Martinez</td>
                <td>English Literature</td>
                <td>Professor</td>
                <td>sarah.martinez@university.edu</td>
                <td>(319) 555-0128</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>David Thompson</td>
                <td>History</td>
                <td>Associate Professor</td>
                <td>david.thompson@university.edu</td>
                <td>(319) 555-0129</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Lisa Garcia</td>
                <td>Psychology</td>
                <td>Clinical Professor</td>
                <td>lisa.garcia@university.edu</td>
                <td>(319) 555-0130</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Robert Anderson</td>
                <td>Engineering</td>
                <td>Dean</td>
                <td>robert.anderson@university.edu</td>
                <td>(319) 555-0131</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Emily Rodriguez</td>
                <td>Art & Design</td>
                <td>Lecturer</td>
                <td>emily.rodriguez@university.edu</td>
                <td>(319) 555-0132</td>
              </tr>
            </template>
          </uids-table>

          <nav class="pager">
            <div class="visually-hidden">Pagination</div>
            <ul class="pager">
              <li class="pager is-active">
                <a href="/">
                  <span class="visually-hidden">Current page</span>1
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>2
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>3
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>4
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Next page</span>
                  <span>Next ›</span>
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Last page</span>
                  <span>Last »</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `,
  }),
}

// Original story
export const Directory = {
  ...Template,
  args: {
    showSidebar: false,
  },
}
