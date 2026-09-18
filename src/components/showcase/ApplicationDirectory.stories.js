import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';
import '../../scss/components/form.scss';
import '../../scss/components/pager.scss';
import '../../scss/layout/_flexbox.scss';
import '../../scss/layout/_grid.scss';

import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';
import UidsTable from '../table/Table.vue';
import UidsMenu from '../menu/Menu.vue';
import ExampleFiltersForm from '../form/ExampleFiltersForm.vue';

export default {
  subcomponents: { ExampleFiltersForm },
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
    showSidebar: {
      name: 'Show sidebar',
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

const directoryEntries = [
  { name: 'John Smith', department: 'Computer Science', title: 'Professor', email: 'john.smith@university.edu', phone: '(319) 555-0123' },
  { name: 'Jane Doe', department: 'Mathematics', title: 'Associate Professor', email: 'jane.doe@university.edu', phone: '(319) 555-0124' },
  { name: 'Bob Johnson', department: 'Physics', title: 'Department Chair', email: 'bob.johnson@university.edu', phone: '(319) 555-0125' },
  { name: 'Alice Williams', department: 'Biology', title: 'Research Scientist', email: 'alice.williams@university.edu', phone: '(319) 555-0126' },
  { name: 'Michael Chen', department: 'Chemistry', title: 'Assistant Professor', email: 'michael.chen@university.edu', phone: '(319) 555-0127' },
  { name: 'Sarah Martinez', department: 'English Literature', title: 'Professor', email: 'sarah.martinez@university.edu', phone: '(319) 555-0128' },
  { name: 'David Thompson', department: 'History', title: 'Associate Professor', email: 'david.thompson@university.edu', phone: '(319) 555-0129' },
  { name: 'Lisa Garcia', department: 'Psychology', title: 'Clinical Professor', email: 'lisa.garcia@university.edu', phone: '(319) 555-0130' },
  { name: 'Robert Anderson', department: 'Engineering', title: 'Dean', email: 'robert.anderson@university.edu', phone: '(319) 555-0131' },
  { name: 'Emily Rodriguez', department: 'Art & Design', title: 'Lecturer', email: 'emily.rodriguez@university.edu', phone: '(319) 555-0132' },
];

const Template = {
  render: (args) => ({
    components: { UidsButton, BrandBar, UidsTable, UidsMenu, ExampleFiltersForm },
    setup() {
      return { args, directoryEntries, horizontalMenuItems };
    },
    template: `
      <main>
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

          <div class="content flex flex--wrap flex--gap__md">

            <div class="sidebar flex--2 column-container" v-if="args.showSidebar">
              <example-filters-form/>
            </div>

            <div class="main-panel" :class="args.showSidebar ? 'flex--10' : 'flex--12'">
              <div class="element--margin__bottom--extra element--margin__top--extra">
                <example-filters-form v-if="!args.showSidebar"/>
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
                  <tr v-for="entry in directoryEntries" :key="entry.email">
                    <td>
                      <uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false"
                                   :transparent="true" :light_font="true">Edit <i style="color: var(--uiowa-color-brand-black)"
                                                                                  class="fas fa-pencil" aria-hidden="true"></i></uids-button>
                    </td>
                    <td>{{ entry.name }}</td>
                    <td>{{ entry.department }}</td>
                    <td>{{ entry.title }}</td>
                    <td>{{ entry.email }}</td>
                    <td>{{ entry.phone }}</td>
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
        </div>
      </main>
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
