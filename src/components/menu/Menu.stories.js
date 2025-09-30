import UidsMenu from './Menu.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
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
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    theme: {
      control: { type: 'select' },
      options: ['', 'light', 'on-dark'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { UidsMenu },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <uids-menu v-bind="args" />
  `,
});

// Sample menu data with icons
const horizontalMenuItems = [
  { 
    label: 'Home', 
    url: '#home',
    icon: 'fas fa-home',
    active: true
  },
  { 
    label: 'About', 
    url: '#about',
    icon: 'fas fa-info-circle'
  },
  { 
    label: 'Services', 
    url: '#services',
    icon: 'fas fa-briefcase',
    children: [
      { label: 'Web Design', url: '#web-design' },
      { label: 'Development', url: '#development' },
      { label: 'Consulting', url: '#consulting' },
    ]
  },
  { 
    label: 'Contact', 
    url: '#contact',
    icon: 'fas fa-envelope'
  },
];

const verticalMenuItems = [
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
        children: [
          { label: 'Computer Science', url: '#cs' },
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

export const HorizontalMenu = Template.bind({});
HorizontalMenu.args = {
  variant: 'horizontal',
  items: horizontalMenuItems,
  theme: '',
};

export const HorizontalMenuWithIcons = Template.bind({});
HorizontalMenuWithIcons.args = {
  variant: 'horizontal',
  items: horizontalMenuItems,
  theme: '',
};

export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
  variant: 'vertical',
  items: verticalMenuItems,
  theme: '',
};

export const VerticalMenuThreeLevels = Template.bind({});
VerticalMenuThreeLevels.args = {
  variant: 'vertical',
  items: verticalMenuItems,
  theme: '',
};

// Dark background examples
const DarkBackgroundTemplate = (args) => ({
  components: { UidsMenu },
  setup() {
    return { args };
  },
  template: `
    <div style="background: #000; padding: 2rem;">
      <uids-menu v-bind="args" />
    </div>
  `,
});

export const HorizontalMenuOnDark = DarkBackgroundTemplate.bind({});
HorizontalMenuOnDark.args = {
  variant: 'horizontal',
  items: horizontalMenuItems,
  theme: 'on-dark',
};

export const VerticalMenuOnDark = DarkBackgroundTemplate.bind({});
VerticalMenuOnDark.args = {
  variant: 'vertical',
  items: verticalMenuItems,
  theme: 'on-dark',
};
