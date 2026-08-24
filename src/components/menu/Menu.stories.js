import UidsMenu from './Menu.vue';

export default {
  title: 'Components/Menu',
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  component: UidsMenu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
};

const Template = {
  render: (args) => ({
    components: { UidsMenu },
    setup() {
      return { args };
    },
    template: `
      <div class="column-container">
        <uids-menu v-bind="args" :top="true" />
      </div>
    `,
  }),
};

// Sample menu data with icons
const menuItems = [
  {
    label: 'Dashboard',
    url: '#dashboard',
    icon: 'fa-tachometer-alt',
    active: true
  },
  {
    label: 'Academic Programs',
    url: '#programs',
    icon: 'fa-graduation-cap',
    expanded: true,
    children: [
      {
        label: 'Undergraduate',
        url: '#undergraduate',
        children: [
          {
            label: 'Computer Science',
            url: '#cs',
            icon: 'fa-graduation-cap',
          },
          { label: 'Engineering', url: '#engineering' },
          { label: 'Business', url: '#business' },
        ]
      },
      { label: 'Graduate', url: '#graduate' },
      { label: 'Continuing Education', url: '#continuing' },
    ]
  },
  {
    label: 'Admissions',
    url: '#admissions',
    icon: 'fa-door-open',
    children: [
      { label: 'Apply Now', url: '#apply', icon: 'fa-paper-plane' },
      { label: 'Requirements', url: '#requirements' },
      { label: 'Scholarships', url: '#scholarships' },
    ]
  },
  {
    label: 'Student Services',
    url: '#services',
    icon: 'fa-users'
  },
  {
    label: 'Campus Life',
    url: '#campus',
    icon: 'fa-university'
  },
];

export const HorizontalMenu = {
  name: 'Horizontal Menu',
  ...Template,
  args: {
    variant: 'horizontal',
    items: menuItems,
    label: "Main",
  },
};

export const VerticalMenu = {
  name: 'Vertical Menu',
  ...Template,
  args: {
    variant: 'vertical',
    items: menuItems,
    label: "Section",
  },
};

const branchItems = [
  {
    label: 'Program groups',
    children: [
      { label: 'Active nested item', url: '#active-nested', active: true },
      { label: 'Nested link', url: '#nested-link' },
    ],
  },
  { label: 'Standalone link', url: '#standalone' },
];

// Exercises three branches absent from the original fixture: top=false (no nav
// landmark), a children-only group label, and an active nested link.
export const Branches = {
  render: (args) => ({
    components: { UidsMenu },
    setup() {
      return { args };
    },
    template: `
      <div class="menu-branches">
        <uids-menu v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'vertical',
    items: branchItems,
    label: 'Branch coverage',
    top: false,
  },
};

export const Container = {
  render: (args) => ({
    components: { UidsMenu },
    setup() {
      return { args };
    },
    template: `
      <div class="column-container menu--container">
        <uids-menu v-bind="args" :top="true" />
      </div>
    `,
  }),
  args: {
    variant: 'horizontal',
    items: menuItems,
    label: 'Container menu',
  },
};

export const OnLightBackgrounds = {
  render: (args) => ({
    components: { UidsMenu },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div class="bg--white menu-context--white" style="padding: 1rem">
          <uids-menu v-bind="args" label="White background menu" :top="true" />
        </div>
        <div class="bg--gray menu-context--gray" style="padding: 1rem">
          <uids-menu v-bind="args" label="Gray background menu" :top="true" />
        </div>
      </div>
    `,
  }),
  args: {
    variant: 'vertical',
    items: branchItems,
  },
};
