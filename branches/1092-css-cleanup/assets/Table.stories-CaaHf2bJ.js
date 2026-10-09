import{i as e}from"./preload-helper-DylEL7Is.js";import{t}from"./_background-DBZ3BiBv.js";import{n,t as r}from"./background-CF50TMRF.js";import{n as i,t as a}from"./Table-CG1vR9mM.js";var o,s,c,l,u;e((()=>{i(),n(),t(),o={title:`Components/Table`,component:a,argTypes:{...r.argTypes,links:{name:`Links`,control:`boolean`},summary:{control:{type:`text`},name:`Summary`},caption:{control:{type:`text`},name:`Caption`},sticky:{control:{type:`boolean`},name:`Sticky`,table:{category:`Display options`}},highlight:{control:{type:`boolean`},name:`Hover highlight`,table:{category:`Display options`}},border:{control:{type:`boolean`},name:`Border`,table:{category:`Display options`}}}},s=e=>({components:{UidsTable:a},setup(){return{args:e}},template:`
    <div :class="args.background ? 'bg--' + args.background : ''" style="padding: 1rem;">
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
          <th scope="row"><a v-if="args.links" href="#tuition">Tuition & Fees</a><template v-else>Tuition & Fees</template></th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><a v-if="args.links" href="#housing">Housing & Meals</a><template v-else>Housing & Meals</template></th>
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
    </div>
  `}),c=s.bind({}),c.args={summary:`Undergraduate Cost of Attendance - Living on Campus Example Table`,caption:`Living On Campus - Example Table`,sticky:!0,highlight:!0,border:!0},l=s.bind({}),l.args={...c.args,links:!0,background:`black`},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsTable
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.background ? 'bg--' + args.background : ''" style="padding: 1rem;">
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
          <th scope="row"><a v-if="args.links" href="#tuition">Tuition & Fees</a><template v-else>Tuition & Fees</template></th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><a v-if="args.links" href="#housing">Housing & Meals</a><template v-else>Housing & Meals</template></th>
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
    </div>
  \`
})`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsTable
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.background ? 'bg--' + args.background : ''" style="padding: 1rem;">
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
          <th scope="row"><a v-if="args.links" href="#tuition">Tuition & Fees</a><template v-else>Tuition & Fees</template></th>
          <td>$0,000</td>
          <td>$00,000</td>
        </tr>
        <tr>
          <th scope="row"><a v-if="args.links" href="#housing">Housing & Meals</a><template v-else>Housing & Meals</template></th>
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
    </div>
  \`
})`,...l.parameters?.docs?.source}}},u=[`Default`,`Links`]}))();export{c as Default,l as Links,u as __namedExportsOrder,o as default};