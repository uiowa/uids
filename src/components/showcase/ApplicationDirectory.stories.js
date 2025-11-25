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
import UidsFormFieldset from '../form/FormFieldset.vue'

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
  argTypes: {
    collapsible: {
      name: 'Collapsible',
    }
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
    components: { UidsButton, BrandBar, UidsTable, UidsMenu, UidsFormFieldset },
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

          <div class="element--margin__bottom--extra element--margin__top--extra">
            <form class="form" action="/" method="get"
                  accept-charset="UTF-8">

              <uids-form-fieldset class="form--inline form--small form--compact"
                                  label="Filters"
                                  inline_label
              >

                <div class="form-item">
                  <label for="edit-college">College</label>
                  <select id="edit-college" name="college" class="form-select" autocomplete="off">
                    <option selected="" value="17">Carver College of Medicine</option>
                  </select>
                </div>

                <div class=" form-item">
                  <label for="edit-department">Department</label>
                  <select id="edit-department" name="department" class="form-select" autocomplete="off">
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
                  <select id="edit-membership" name="membership" autocomplete="off" class="form-select">
                    <option selected="" value="">All</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                  </select>
                </div>

                <div class=" form-item">
                  <label for="edit-person-type">Person type</label>
                  <select id="edit-person-type" name="type" class="form-select">
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
                  <select id="edit-status" name="status" class="form-select">
                    <option value="All" selected="selected">- Any -</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </uids-form-fieldset>

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
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>John Smith</td>
                <td>Computer Science</td>
                <td>Professor</td>
                <td>john.smith@university.edu</td>
                <td>(319) 555-0123</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Jane Doe</td>
                <td>Mathematics</td>
                <td>Associate Professor</td>
                <td>jane.doe@university.edu</td>
                <td>(319) 555-0124</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Bob Johnson</td>
                <td>Physics</td>
                <td>Department Chair</td>
                <td>bob.johnson@university.edu</td>
                <td>(319) 555-0125</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Alice Williams</td>
                <td>Biology</td>
                <td>Research Scientist</td>
                <td>alice.williams@university.edu</td>
                <td>(319) 555-0126</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Michael Chen</td>
                <td>Chemistry</td>
                <td>Assistant Professor</td>
                <td>michael.chen@university.edu</td>
                <td>(319) 555-0127</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Sarah Martinez</td>
                <td>English Literature</td>
                <td>Professor</td>
                <td>sarah.martinez@university.edu</td>
                <td>(319) 555-0128</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>David Thompson</td>
                <td>History</td>
                <td>Associate Professor</td>
                <td>david.thompson@university.edu</td>
                <td>(319) 555-0129</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Lisa Garcia</td>
                <td>Psychology</td>
                <td>Clinical Professor</td>
                <td>lisa.garcia@university.edu</td>
                <td>(319) 555-0130</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
                <td>Robert Anderson</td>
                <td>Engineering</td>
                <td>Dean</td>
                <td>robert.anderson@university.edu</td>
                <td>(319) 555-0131</td>
              </tr>
              <tr>
                <td>
                  <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                               :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)"
                                                                              class="fas fa-pencil"></i></uids-button>
                </td>
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
    collapsible: false,
  },
}
