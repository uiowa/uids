import{d as P,k as _,c as l,e as V,a as h,b as y,q as c,p as d,n as v,o as g,f as p,t as f}from"./vue.esm-bundler-B7frGVmg.js";import{B as u}from"./_background-DssJo4kH.js";import{_ as W}from"./Headline.vue_vue_type_script_setup_true_lang-CRPi1jow.js";import{_ as E}from"./Button.vue_vue_type_script_setup_true_lang-BtFSlIHd.js";import{c as k}from"./utlity-CAV5GFHh.js";import{_ as L,a as q}from"./GridItem.vue_vue_type_script_setup_true_lang-BJvXpy9o.js";const z={class:"cta__container"},O={key:0,class:"cta__title"},R={key:1,class:"cta__content"},F={key:2,class:"cta__link"},m=P({__name:"Cta",props:{headline_style:{type:String,default:""},url:{type:String},details:{type:String},orientation:{type:String,default:""},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:""},...u.props},setup(t){const o=t,j=_(()=>{let e=["cta"];return u.addBackgroundClass(e,o),["button_align_right"].forEach(n=>{o[n]===!0&&e.push(`cta--${k(n)}`)}),o.orientation&&e.push(`cta--${k(o.orientation)}`),e}),D=_(()=>[""]);return(e,n)=>(g(),l("div",{class:v(j.value)},[V("div",z,[e.$slots.title?(g(),l("div",O,[h(W,{text_style:t.headline_style},{default:y(()=>[d(e.$slots,"title",{},()=>[n[0]||(n[0]=p("Title"))])]),_:3},8,["text_style"])])):c("",!0),t.details?(g(),l("div",R,[d(e.$slots,"details",{},()=>[p(f(t.details),1)])])):c("",!0),t.button_label?(g(),l("div",F,[h(E,{class:v(D.value),url:t.url,size:"medium"},{default:y(()=>[d(e.$slots,"button_label",{},()=>[p(f(t.button_label),1)]),d(e.$slots,"button_icon")]),_:3},8,["class","url"])])):c("",!0)])],2))}}),Y={title:"Components/CTA",parameters:{docs:{source:{code:null}}},component:m,tags:["autodocs"],argTypes:{headline_style:{name:"Title style",options:["uppercase","serif",""],control:{type:"select",labels:{uppercase:"Antonio (default)",serif:"Zilla Slab","":"Roboto"}},table:{category:"Display options"}},orientation:{name:"Orientation",options:["","left","inline"],control:{type:"select",labels:{"":"Centered (default)",left:"Left",inline:"Inline"}},table:{category:"Display options"}},url:{control:{type:"text"}},title:{control:{type:"text"}},details:{control:{type:"text"}},button_label:{control:{type:"text"}},button_icon:{control:{type:"text"}},button_align_right:{name:"Align button to right",table:{category:"Display options"}},section_background:{name:"Section background",options:["","bg--black","bg--black--pattern--brain","bg--black--pattern--community","bg--black--pattern--particle","bg--gold","bg--gold--pattern--brain","bg--gold--pattern--community","bg--gold--pattern--particle","bg--gray","bg--gray--pattern--brain","bg--gray--pattern--community","bg--gray--pattern--particle","bg--white","bg--white--pattern--brain","bg--white--pattern--community","bg--white--pattern--particle"],control:{type:"select",labels:{"":"- None -","bg--black":"Black","bg--black--pattern--brain":"Black - Brain pattern","bg--black--pattern--community":"Black - Community pattern","bg--black--pattern--particle":"Black - Particle pattern","bg--gold":"Gold","bg--gold--pattern--brain":"Gold - Brain pattern","bg--gold--pattern--community":"Gold - Community pattern","bg--gold--pattern--particle":"Gold - Particle pattern","bg--gray":"Gray","bg--gray--pattern--brain":"Gray - Brain pattern","bg--gray--pattern--community":"Gray - Community pattern","bg--gray--pattern--particle":"Gray - Particle pattern","bg--white":"White","bg--white--pattern--brain":"White - Brain pattern","bg--white--pattern--community":"White - Community pattern","bg--white--pattern--particle":"White - Particle pattern"}},table:{category:"Container"}},...u.argTypes}},b=t=>({components:{UidsCta:m},setup(){return{args:t}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
    </div>
  `}),a=b.bind({});a.args={url:"https://uiowa.edu/",title:"Be a Hawkeye",details:"<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>",button_label:"Request Information",button_icon:'<i class="fas fa-arrow-right"></i>',button_align_right:!1,headline_style:"uppercase",background:"gray",orientation:""};const s=b.bind({});s.args={...a.args,orientation:"inline"};const i=b.bind({});i.args={...a.args,orientation:"left"};const H=t=>({components:{UidsGrid:L,UidsGridItem:q,UidsCta:m},setup(){return{args:t}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-cta
            :url="args.url"
            :background="args.background"
            :title="args.title"
            :button_label="args.button_label"
            :button_icon="args.button_icon"
            :button_align_right="args.button_align_right"
            :details="args.details"
            :headline_style="args.headline_style"
            :orientation="args.orientation"
          >
            <template #details v-if="args.details"><div v-html="args.details" ></div></template>
            <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
            <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
          </uids-cta>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),r=H.bind({});r.args={...a.args,grid_type:"threecol--33-34-33",record_count:3};var C,w,B;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
    </div>
  \`
})`,...(B=(w=a.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var G,S,T;s.parameters={...s.parameters,docs:{...(G=s.parameters)==null?void 0:G.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
    </div>
  \`
})`,...(T=(S=s.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var $,U,I;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
    </div>
  \`
})`,...(I=(U=i.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var x,A,N;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsGrid,
    UidsGridItem,
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-cta
            :url="args.url"
            :background="args.background"
            :title="args.title"
            :button_label="args.button_label"
            :button_icon="args.button_icon"
            :button_align_right="args.button_align_right"
            :details="args.details"
            :headline_style="args.headline_style"
            :orientation="args.orientation"
          >
            <template #details v-if="args.details"><div v-html="args.details" ></div></template>
            <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
            <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
          </uids-cta>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(N=(A=r.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};const tt=["Centered","Inline","Left","Grid"];export{a as Centered,r as Grid,s as Inline,i as Left,tt as __namedExportsOrder,Y as default};
