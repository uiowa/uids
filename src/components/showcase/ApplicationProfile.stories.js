import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';
import '../../scss/components/badge.scss';
import '../../scss/components/form.scss';
import '../../scss/layout/_flexbox.scss';
import '../../scss/layout/_grid.scss';

import { ref } from 'vue';
import UidsButton from '../button/Button.vue';
import BrandBar from '../brand-bar/BrandBar.vue';
import UidsMenu from '../menu/Menu.vue';
import UidsTable from '../table/Table.vue';
import UidsBadge from '../badge/Badge.vue';

/**
 * An employee profile, set with the typography roles (Tokens (roles) › Style Library). An application
 * is a dense page, so it takes the Hierarchy 4× recipe (4 : 2 : 1.25 : 1): the person's name is Headline Small, each panel's
 * heading Subhead Small, each group heading Subhead 2 Small in Bold, and everything else Body and Label.
 * The components (brand bar, menus, buttons, badges, table) keep their shipped styles: moving them onto
 * the roles is the next step after the roles are approved. Every role is applied through the live
 * custom properties by a data-role attribute, and "Show roles" labels each one.
 */

export default {
  title: 'Showcase/Application',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

const horizontalMenuItems = [
  { label: 'Home', url: '#', icon: 'fas fa-house' },
  { label: 'Employees', url: '#', icon: 'fas fa-users', children: [] },
  { label: 'Transactions', url: '#', icon: 'fas fa-file-lines' },
  { label: 'Reports', url: '#', icon: 'fas fa-chart-simple' },
  { label: 'Help', url: '#', icon: 'fas fa-circle-question' },
];
const sidebarMenuItems = [
  { label: 'Overview & Position', url: '#', active: true },
  { label: 'Appointment History', url: '#' },
  { label: 'Work Arrangements', url: '#' },
  { label: 'Leave Balances', url: '#' },
  { label: 'Pay & Tax History', url: '#' },
  { label: 'Performance', url: '#' },
  { label: 'Credentials & Compliance', url: '#' },
  { label: 'ePersonnel & Documents', url: '#' },
  { label: 'Activity Log', url: '#' },
];
const ROLES = ['headline', 'subhead', 'subhead-2', 'body', 'label'].flatMap((f) => ['large', 'medium', 'small'].map((s) => `${f}-${s}`));
const roleCss = ROLES.map((r) => `.ep [data-role="${r}"]{font-family:var(--uiowa-typography-${r}-font-family);font-weight:var(--uiowa-typography-${r}-font-weight);font-size:var(--uiowa-typography-${r}-font-size);line-height:var(--uiowa-typography-${r}-line-height)}`).join('\n');

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Gothic:wdth,wght@75,600&display=swap');
  ${roleCss}
  .ep { --ep-related: var(--uiowa-typography-space-related); --ep-break: var(--uiowa-typography-space-break); }
  .ep__toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px; padding: 12px 0; border-bottom: 1px solid var(--uiowa-color-neutral-175); font-size: 0.875rem; color: var(--uiowa-color-neutral-700); }
  .ep__toolbar label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
  .ep__toolbar b { color: var(--uiowa-color-neutral-900); }
  /* Role tags: every data-role element shows its role when the toggle is on. */
  .ep--tags [data-role] { position: relative; outline: 1px dashed color-mix(in srgb, var(--uiowa-color-blue) 50%, transparent); outline-offset: 2px; }
  .ep--tags [data-role]::after { content: attr(data-role); position: absolute; right: 0; top: -1.1em; padding: 1px 6px; border-radius: 3px; background: var(--uiowa-color-blue); color: var(--uiowa-color-neutral-0); font: 700 10px/1.4 var(--uiowa-typography-font-family-roboto); letter-spacing: .04em; text-transform: none; white-space: nowrap; pointer-events: none; }
  .ep--tags .ep__band [data-role]::after { top: auto; bottom: -1.1em; }

  .ep__panel { padding: 24px; margin-bottom: var(--ep-break); background: var(--uiowa-color-neutral-0); border: 1px solid var(--uiowa-color-neutral-175); }
  .ep__band { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; padding: 24px; margin-bottom: var(--ep-related); background: var(--uiowa-color-brand-black); color: var(--uiowa-color-neutral-0); }
  .ep__avatar { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; background: var(--uiowa-color-brand-gold); color: var(--uiowa-color-brand-black); flex-shrink: 0; }
  .ep__band > div:nth-child(2) { flex: 1 1 240px; min-width: 0; }
  .ep__band [data-role] { color: inherit; margin: 0; }
  .ep__band .badges { display: flex; flex-wrap: wrap; gap: 8px; }
  .ep__band .badges .badge { margin: 0; }
  .ep__name { margin: 0; overflow-wrap: anywhere; }
  .ep__facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 0 0 var(--ep-break); padding: 0; list-style: none; }
  .ep__facts li { padding: 14px 16px; border: 1px solid var(--uiowa-color-neutral-175); }
  .ep__facts span, .ep__kv dt { display: block; text-transform: uppercase; letter-spacing: .06em; color: var(--uiowa-color-neutral-500); margin: 0 0 4px; }
  .ep__panel h2, .ep__panel h3 { margin: 0; color: var(--uiowa-color-neutral-900); }
  .ep__panel h2 { padding-bottom: 12px; margin-bottom: var(--ep-related); border-bottom: 1px solid var(--uiowa-color-neutral-150); }
  .ep__panel h3 { margin-top: var(--ep-break); margin-bottom: 12px; font-weight: 700 !important; }
  .ep__panel h2 + h3 { margin-top: 0; }
  .ep__kv { display: grid; grid-template-columns: minmax(160px, 220px) 1fr; gap: 0 24px; margin: 0; }
  .ep__kv dt, .ep__kv dd { margin: 0; padding: 10px 0; border-bottom: 1px solid var(--uiowa-color-neutral-150); }
  .ep__kv dt { align-self: center; margin: 0; }
  .ep__pending { margin: 0; padding-left: 1.2em; }
  .ep__pending li { margin: 0 0 8px; }
  .ep__pending li::marker { color: var(--uiowa-color-brand-gold); }
  .ep__card { padding: 0 0 var(--ep-related); }
  .ep__card .ep__band { margin: 0 0 16px; flex-direction: column; align-items: flex-start; gap: 12px; padding: 20px; }
  .ep__card .ep__band > div:nth-child(2) { flex: 0 0 auto; }
  .ep__contact { margin: 0 0 var(--ep-related); padding: 0 4px; list-style: none; }
  .ep__contact li { padding: 6px 0; }
  .ep__contact i { width: 1.4em; color: var(--uiowa-color-neutral-500); }
  .ep__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: var(--ep-related); }
  .ep .table-container table { font-family: var(--uiowa-typography-body-small-font-family); font-size: var(--uiowa-typography-body-small-font-size); line-height: var(--uiowa-typography-body-small-line-height); }
  .ep__legend { margin: 0; padding: 12px 0 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 4px 24px; font-size: 0.8125rem; color: var(--uiowa-color-neutral-700); }
  .ep__legend b { color: var(--uiowa-color-neutral-900); }
`;

const history = [
  ['2024–25', '100%', '40', '40', '0', '20', '0'],
  ['2023–24', '100%', '40', '40', '0', '20', '0'],
  ['2022–23', '100%', '40', '40', '0', '20', '0'],
  ['2021–22', '100%', '40', '40', '0', '20', '0'],
];
const LEGEND = [
  ['Page title (the name)', 'Headline Small'], ['Panel heading', 'Subhead Small'], ['Group heading', 'Subhead 2 Small, Bold'],
  ['Values, lists, running text', 'Body Medium'], ['Table text', 'Body Small'], ['Field labels', 'Label Medium, uppercase'],
  ['Job title, timestamps', 'Label Large'], ['Brand bar, menus, buttons, badges', 'The components’ own styles, for now'],
];

export const EmployeeProfile = {
  name: 'Employee Profile (typography roles)',
  render: () => ({
    components: { UidsButton, BrandBar, UidsMenu, UidsTable, UidsBadge },
    setup() {
      const tags = ref(false);
      return { css, tags, horizontalMenuItems, sidebarMenuItems, history, legend: LEGEND };
    },
    template: `
      <main :class="['ep', { 'ep--tags': tags }]">
        <component is="style">{{ css }}</component>
        <brand-bar :narrow="true" :healthcare="false">
          <h1 class="site-name flex--10">Employee Profile</h1>
          <div class="user-menu-toggle bg--gold">
            <uids-button :url="''" color="link" size="small" :borderless="true" :full="false" :transparent="true" :light_font="true"><i style="color: var(--uiowa-color-brand-black)" class="fas fa-user" aria-hidden="true"></i> Ed Hill (Supervisor) <i style="color: var(--uiowa-color-brand-black)" class="fas fa-caret-down" aria-hidden="true"></i></uids-button>
            <ul class="menu"><li><a href="#">Sign out</a></li></ul>
          </div>
        </brand-bar>
        <div class="menu--container">
          <div class="layout-container">
            <uids-menu variant="horizontal" :items="horizontalMenuItems" label="Main" top />
          </div>
        </div>
        <div class="layout-container">
          <div class="ep__toolbar">
            <span><b>Typography roles on an application page:</b> the Hierarchy 4× recipe, 4 : 2 : 1.25 : 1, with Label for the small text.</span>
            <label><input v-model="tags" type="checkbox"> Show roles</label>
          </div>
          <ul v-if="tags" class="ep__legend">
            <li v-for="[what, role] in legend" :key="what"><b>{{ what }}</b> · {{ role }}</li>
          </ul>
        </div>
        <div class="layout-container element--margin__top--extra">
          <div class="breadcrumb" data-role="label-large">Employees › Jane Doe</div>
          <div class="content flex flex--wrap flex--gap__md">

            <div class="sidebar flex--3 column-container">
              <div class="ep__card">
                <div class="ep__band">
                  <div class="ep__avatar" data-role="subhead-small" aria-hidden="true">JD</div>
                  <div>
                    <p data-role="subhead-2-medium"><b>Jane Doe</b></p>
                    <p data-role="label-large">Program Coordinator (PAD1)</p>
                  </div>
                </div>
                <ul class="ep__contact" data-role="body-medium">
                  <li><i class="fas fa-id-card" aria-hidden="true"></i> 00012345</li>
                  <li><i class="fas fa-envelope" aria-hidden="true"></i> jane-doe@uiowa.edu</li>
                  <li><i class="fas fa-phone" aria-hidden="true"></i> (319) 555-1234</li>
                  <li><i class="fas fa-sitemap" aria-hidden="true"></i> CLAS - Administration</li>
                </ul>
              </div>
              <uids-menu variant="vertical" :items="sidebarMenuItems" label="Profile sections" top />
            </div>

            <div class="main-panel flex--9" role="region" aria-label="Main content">
              <div class="ep__band">
                <div class="ep__avatar" data-role="subhead-small" aria-hidden="true">JD</div>
                <div>
                  <h1 class="ep__name" data-role="headline-small">Jane Doe</h1>
                  <p data-role="label-large">Program Coordinator (PAD1) · CLAS - Administration</p>
                </div>
                <div class="badges">
                  <uids-badge type="secondary" text="P&amp;S" />
                  <uids-badge type="secondary" text="Regular" />
                  <uids-badge type="secondary" text="Salaried" />
                  <uids-badge type="secondary" text="Fiscal" />
                </div>
              </div>

              <ul class="ep__facts">
                <li><span data-role="label-medium">Employee ID</span><div data-role="body-medium">00012345</div></li>
                <li><span data-role="label-medium">Email</span><div data-role="body-medium">jane-doe@uiowa.edu</div></li>
                <li><span data-role="label-medium">Phone</span><div data-role="body-medium">(319) 555-1234</div></li>
                <li><span data-role="label-medium">Supervisor</span><div data-role="body-medium">Alex Johnson</div></li>
                <li><span data-role="label-medium">Department</span><div data-role="body-medium">CLAS - Administration</div></li>
              </ul>

              <section class="ep__panel">
                <h2 data-role="subhead-small">Pending activity</h2>
                <ul class="ep__pending" data-role="body-medium">
                  <li>Annual performance review due for 3 direct reports (due in 8 days)</li>
                  <li>Probationary period ends March 15: action required</li>
                  <li>2 time sheets requiring approval</li>
                </ul>
                <div class="ep__actions">
                  <uids-button :url="''" color="primary" size="small" :full="false">Start onboarding</uids-button>
                  <uids-button :url="''" color="secondary" size="small" :full="false">Request a change</uids-button>
                </div>
              </section>

              <section class="ep__panel">
                <h2 data-role="subhead-small">Profile</h2>
                <h3 data-role="subhead-2-small">Position information</h3>
                <dl class="ep__kv">
                  <dt data-role="label-medium">Job title</dt><dd data-role="body-medium">Program Coordinator</dd>
                  <dt data-role="label-medium">Jobcode</dt><dd data-role="body-medium">PAD1</dd>
                  <dt data-role="label-medium">Supervisor</dt><dd data-role="body-medium">Alex Johnson</dd>
                  <dt data-role="label-medium">Department</dt><dd data-role="body-medium">CLAS - Administration</dd>
                  <dt data-role="label-medium">Work modality</dt><dd data-role="body-medium">Hybrid, 50% on campus</dd>
                </dl>
                <h3 data-role="subhead-2-small">Employment information</h3>
                <dl class="ep__kv">
                  <dt data-role="label-medium">Employment type</dt><dd data-role="body-medium">P&amp;S</dd>
                  <dt data-role="label-medium">Classifications</dt><dd data-role="body-medium">Regular, Salaried, Fiscal</dd>
                  <dt data-role="label-medium">First hire date</dt><dd data-role="body-medium">July 7, 2012</dd>
                  <dt data-role="label-medium">Most recent hire date</dt><dd data-role="body-medium">March 12, 2022</dd>
                </dl>
                <h3 data-role="subhead-2-small">Effort allocation history</h3>
                <uids-table summary="Effort allocation by year" caption="Effort allocation history" :border="true" :highlight="true" :sticky="false">
                  <template #thead>
                    <tr><th scope="col">Year</th><th scope="col">% Time</th><th scope="col">% Teaching</th><th scope="col">% Research</th><th scope="col">% Admin</th><th scope="col">% Service</th><th scope="col">% Clinical</th></tr>
                  </template>
                  <template #tbody>
                    <tr v-for="row in history" :key="row[0]"><td v-for="(cell, i) in row" :key="i">{{ cell }}</td></tr>
                  </template>
                </uids-table>
              </section>
            </div>
          </div>
        </div>
      </main>
    `,
  }),
};
