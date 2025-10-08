import{d as h,g,c as m,f as a,t as u,j as n,n as r,o as y}from"./vue.esm-bundler-6yBGeiij.js";const b=["summary"],d=h({__name:"Table",props:{summary:{type:String,default:""},caption:{type:String,default:"Table"},sticky:{type:Boolean,default:!1},highlight:{type:Boolean,default:!1},border:{type:Boolean,default:!1}},setup(e){const s=e,c=g(()=>{let t=[];return s.highlight&&t.push("table--hover-highlight"),s.border&&t.push("table--gray-borders"),t});return(t,T)=>(y(),m("div",{class:r(["table-responsive",{"table--sticky":s.sticky}])},[a("table",{class:r([c.value,"table"]),summary:e.summary},[a("caption",null,u(e.caption),1),a("thead",null,[n(t.$slots,"thead")]),a("tbody",null,[n(t.$slots,"tbody")])],10,b)],2))}}),k={title:"Components/Table",component:d,argTypes:{summary:{control:{type:"text"},name:"Summary"},caption:{control:{type:"text"},name:"Caption"},sticky:{control:{type:"boolean"},name:"Sticky",table:{category:"Display options"}},highlight:{control:{type:"boolean"},name:"Hover highlight",table:{category:"Display options"}},border:{control:{type:"boolean"},name:"Border",table:{category:"Display options"}}}},f=e=>({components:{UidsTable:d},setup(){return{args:e}},template:`
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
  `}),o=f.bind({});o.args={summary:"Undergraduate Cost of Attendance - Living on Campus Example Table",caption:"Living On Campus - Example Table",sticky:!0,highlight:!0,border:!0};var l,i,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(p=(i=o.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const C=["Default"];export{o as Default,C as __namedExportsOrder,k as default};
