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
      <div class="column-container"><uids-menu v-bind="args" /></div>
    `,
  }),
};

// Sample menu data with icons
const menuItems = [
  {
    label: 'Dashboard',
    url: '#dashboard',
    icon: 'fas fa-tachometer-alt',
    active: true
  },
  {
    label: 'Academic Programs',
    url: '#programs',
    icon: 'fas fa-graduation-cap',
    expanded: true,
    children: [
      {
        label: 'Undergraduate',
        url: '#undergraduate',
        icon: 'fas fa-graduation-cap',
        children: [
          {
            label: 'Computer Science',
            url: '#cs',
            icon: 'fas fa-graduation-cap',
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
    icon: 'fas fa-door-open',
    children: [
      { label: 'Apply Now', url: '#apply' },
      { label: 'Requirements', url: '#requirements' },
      { label: 'Scholarships', url: '#scholarships' },
    ]
  },
  {
    label: 'Student Services',
    url: '#services',
    icon: 'fas fa-users'
  },
  {
    label: 'Campus Life',
    url: '#campus',
    icon: 'fas fa-university'
  },
];

export const HorizontalMenu = {
  name: 'Horizontal Menu',
  ...Template,
  args: {
    variant: 'horizontal',
    items: menuItems,
  },
};

export const VerticalMenu = {
  name: 'Vertical Menu',
  ...Template,
  args: {
    variant: 'vertical',
    items: menuItems,
  },
};
