import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./_background-5iX1z5X0.js";import{n as t,t as n}from"./background-Cr6Xy-3k.js";import{n as r,t as i}from"./Table-DNEzJR2-.js";var a,o,s,c,l;function u(){return(u=e((()=>{r(),t(),a={title:`Components/Table`,component:i,argTypes:{...n.argTypes,links:{name:`Links`,control:`boolean`},summary:{control:{type:`text`},name:`Summary`},caption:{control:{type:`text`},name:`Caption`},sticky:{control:{type:`boolean`},name:`Sticky`,table:{category:`Display options`}},highlight:{control:{type:`boolean`},name:`Hover highlight`,table:{category:`Display options`}},border:{control:{type:`boolean`},name:`Border`,table:{category:`Display options`}}}},o=e=>({components:{UidsTable:i},setup(){return{args:e}},template:`
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
  `}),s=o.bind({}),s.args={summary:`Undergraduate Cost of Attendance - Living on Campus Example Table`,caption:`Living On Campus - Example Table`,sticky:!0,highlight:!0,border:!0},c=o.bind({}),c.args={...s.args,links:!0,background:`black`},l=[`Default`,`Links`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
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
})`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`args => ({
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
})`,...c.parameters?.docs?.source}}}})))()}u();export{s as Default,c as Links,l as __namedExportsOrder,a as default};