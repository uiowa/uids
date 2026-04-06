import{_ as n}from"./Table.vue_vue_type_script_setup_true_lang-Co-p3YnF.js";import"./iframe-CdHOF2jD.js";import"./preload-helper-BfYMYwp6.js";const d={title:"Components/Table",component:n,argTypes:{summary:{control:{type:"text"},name:"Summary"},caption:{control:{type:"text"},name:"Caption"},sticky:{control:{type:"boolean"},name:"Sticky",table:{category:"Display options"}},highlight:{control:{type:"boolean"},name:"Hover highlight",table:{category:"Display options"}},border:{control:{type:"boolean"},name:"Border",table:{category:"Display options"}}}},a=s=>({components:{UidsTable:n},setup(){return{args:s}},template:`
    <uids-table
      :summary="args.summary"
      :caption="args.caption"
      :sticky="args.sticky"
      :highlight="args.highlight"
      :border="args.border"
    >
      <template #thead>
        <tr>
          <th scope="row">Category</th>
          <th scope="col">Resident</th>
          <th scope="col">Nonresident</th>
        </tr>
      </template>
      <template #tbody>
        <tr>
          <th scope="row">Tuition & Fees</th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row">Housing & Meals</th>
          <td>$00,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><strong>Total</strong></th>
          <td><strong>$00,000</strong></td>
          <td><strong>$00,000</strong></td>
        </tr>
      </template>
    </uids-table>
  `}),t=a.bind({});t.args={summary:"Undergraduate Cost of Attendance - Living on Campus Example Table",caption:"Living On Campus - Example Table",sticky:!0,highlight:!0,border:!0};var e,o,r;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`args => ({
  components: {
    UidsTable
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-table
      :summary="args.summary"
      :caption="args.caption"
      :sticky="args.sticky"
      :highlight="args.highlight"
      :border="args.border"
    >
      <template #thead>
        <tr>
          <th scope="row">Category</th>
          <th scope="col">Resident</th>
          <th scope="col">Nonresident</th>
        </tr>
      </template>
      <template #tbody>
        <tr>
          <th scope="row">Tuition & Fees</th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row">Housing & Meals</th>
          <td>$00,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><strong>Total</strong></th>
          <td><strong>$00,000</strong></td>
          <td><strong>$00,000</strong></td>
        </tr>
      </template>
    </uids-table>
  \`
})`,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const c=["Default"];export{t as Default,c as __namedExportsOrder,d as default};
