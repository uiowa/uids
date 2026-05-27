import{i as e}from"./preload-helper-D0XlrO8e.js";import{n as t,t as n}from"./Table-Df_lA4NO.js";var r,i,a,o;e((()=>{t(),r={title:`Components/Table`,component:n,argTypes:{summary:{control:{type:`text`},name:`Summary`},caption:{control:{type:`text`},name:`Caption`},sticky:{control:{type:`boolean`},name:`Sticky`,table:{category:`Display options`}},highlight:{control:{type:`boolean`},name:`Hover highlight`,table:{category:`Display options`}},border:{control:{type:`boolean`},name:`Border`,table:{category:`Display options`}}}},i=e=>({components:{UidsTable:n},setup(){return{args:e}},template:`
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
  `}),a=i.bind({}),a.args={summary:`Undergraduate Cost of Attendance - Living on Campus Example Table`,caption:`Living On Campus - Example Table`,sticky:!0,highlight:!0,border:!0},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
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
})`,...a.parameters?.docs?.source}}},o=[`Default`]}))();export{a as Default,o as __namedExportsOrder,r as default};