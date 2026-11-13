import{i as e}from"./preload-helper-BL0Fm5OC.js";import{n as t,t as n}from"./Tabs-BWcUUfsj.js";var r,i,a,o,s;e((()=>{t(),r={title:`Components/Tabs`,component:n,tags:[`autodocs`],argTypes:{id:{control:`text`,name:`Unique id`,description:`Required: tabs.js keys panel switching and #hash activation off it.`},aria_label:{control:`text`,name:`Tablist label`}},render:e=>({setup(){return{args:e}},components:{UidsTabs:n},template:`
    <uids-tabs v-bind="args" />
  `})},i=[{title:`Hours`,content:`<p>Open Monday through Friday, 8:00 a.m. to 5:00 p.m. Summer hours may vary by department.</p>`},{title:`Departments`,content:`<p>This building houses University College, Distance and Online Education, and the Division of Continuing Education.</p>`},{title:`Accessibility`,content:`<p>Accessible entrances are located on the north and east sides. An elevator serves all floors.</p>`}],a={args:{id:`tabs-example`,aria_label:`Additional building information`,items:i}},o={render:e=>({setup(){return{args:e}},components:{UidsTabs:n},template:`
    <div>
      <div class="bg--gold" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-gold" /></div>
      <div class="bg--black" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-black" /></div>
    </div>
  `}),args:{aria_label:a.args.aria_label,items:i}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'tabs-example',
    aria_label: 'Additional building information',
    items: items
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      return {
        args
      };
    },
    components: {
      UidsTabs
    },
    template: \`
    <div>
      <div class="bg--gold" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-gold" /></div>
      <div class="bg--black" style="padding: 1rem"><uids-tabs v-bind="args" id="tabs-on-black" /></div>
    </div>
  \`
  }),
  args: {
    aria_label: Default.args.aria_label,
    items: items
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`OnBackgrounds`]}))();export{a as Default,o as OnBackgrounds,s as __namedExportsOrder,r as default};