import{d as Z,k as y,v as J,c as l,l as d,f as v,n as k,m,a as K,b as x,o,p as $,F as W,x as X}from"./vue.esm-bundler--ETYdinE.js";import{_ as Y}from"./Button.vue_vue_type_script_setup_true_lang-ChQE5Vxq.js";import{_ as ee}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as te,_ as ae}from"./click-a11y-CyDOAv-Y.js";import{B}from"./_background-C8gmGjFP.js";import{_ as ne,a as ie}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as R,a as j}from"./ExampleVideoFile-C1dQbF1x.js";import{Primary as i}from"./Button.stories-Cxe31HQS.js";import"./utlity-CAV5GFHh.js";/* empty css               */(function(){const a=matchMedia("(prefers-reduced-motion)");function e(n,r){n&&(this.element=n,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+r,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+r,e.reducedMotionCheck(this.video,this.video_btn),a.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(n,r){a.matches&&(n.pause(),this.setButtonDataPlay(r))},e.pausePlay=function(n,r){n.paused?(n.play(),e.setButtonDataPaused(r)):(n.pause(),e.setButtonDataPlay(r))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const _=document.getElementsByClassName("media--video");for(let n=0;n<_.length;n++)new UidsVideo(_[n],n)})();const re={class:"banner__container"},oe={class:"banner__content"},se={key:0,class:"banner__title"},le=["href"],de={key:1,class:"banner__text"},ge={key:2,class:"banner__action"},ce={key:1,class:"bttn--row"},me=["innerHTML"],w=Z({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(a){return["primary","secondary","tertiary","transparent"].indexOf(a)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},gradient:{type:String,default:"dark",validator:function(a){return["dark","light"].indexOf(a)!==-1}},height:{type:String,default:""},extra_padding:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(a){const e=a,_=y(()=>{let t=["banner"];return B.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.gradient&&e.background===""&&t.push(`banner--gradient-${e.gradient}`),e.height&&t.push(`banner--${e.height}`),e.extra_padding&&t.push("banner--extra-padding"),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),e.background===""&&(e.vertical_alignment==="top"?t.push("banner--gradient-top"):e.vertical_alignment==="bottom"||e.vertical_alignment==="center"?t.push("banner--gradient-bottom"):t.push("banner--gradient-left")),t}),n=y(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),r=y(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return J(()=>{e.buttons.length>0&&te(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((z,b)=>{new window.UidsVideo(z,b)})}),(t,z)=>(o(),l("div",{class:k(_.value)},[d(t.$slots,"media"),v("div",re,[v("div",oe,[t.$slots.title||t.$slots.pre_title?(o(),l("header",se,[t.$slots.pre_title?(o(),l("div",{key:0,class:k(n.value)},[d(t.$slots,"pre_title")],2)):m("",!0),K(ee,{text_style:a.headline_style,highlight:a.headline_highlight,class:k(`headline--${e.headline_size}`)},{default:x(()=>[r.value?(o(),l("a",{key:0,href:r.value,class:"click-target"},[d(t.$slots,"title")],8,le)):d(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):m("",!0),t.$slots.default?(o(),l("div",de,[d(t.$slots,"default")])):m("",!0),a.buttons.length>0||t.$slots.buttons?(o(),l("footer",ge,[d(t.$slots,"buttons",{},()=>[a.buttons.length===1?(o(),$(ae,{key:0,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:a.buttons[0].label},null,8,["color","light_font","innerHTML"])):a.buttons.length>0?(o(),l("div",ce,[(o(!0),l(W,null,X(a.buttons,(b,ue)=>(o(),$(Y,{url:b.url,size:"medium",color:a.button_color,light_font:a.button_light_font},{default:x(()=>[v("span",{innerHTML:b.label},null,8,me)]),_:2},1032,["url","color","light_font"]))),256))])):m("",!0)])])):m("",!0)])])],2))}}),ze={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:w,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(B.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...B.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},gradient:{name:"Gradient",default:"dark",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},extra_padding:{name:"Extra padding",control:{type:"boolean"}},mobile_content_below_image:{name:"Content below media (mobile-only)",control:{type:"boolean"},table:{category:"Display options"}},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},f={render:a=>({components:{UidsBanner:w,ExampleImage:R,ExampleVideoFile:j},setup(){return{args:a}},template:`
      <div class="column-container">
    <uids-banner
      :background="args.background"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :headline_highlight="args.headline_highlight"
      :gradient="args.gradient"
      :height="args.height"
      :extra_padding="args.extra_padding"
      :horizontal_alignment="args.horizontal_alignment"
      :vertical_alignment="args.vertical_alignment"
      :buttons="args.buttons"
      :button_light_font="args.button_light_font"
      :button_color="args.button_color"
      :mobile_content_below_image="args.mobile_content_below_image"
    >
      <template #media v-if="args.background === ''">
        ${a.background_media}
      </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      ${a.content}
    </uids-banner>
      </div>`})},s={...f,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",gradient:"dark",height:"large",extra_padding:!1,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...i.args,label:"Read More "+i.args.icon,color:"primary"}]}};s.storyName="Background image";const u={...f,args:{...s.args,background_media:"<example-video-file />"}};u.storyName="Background video";const h={...f,args:{...s.args,background:"gold--pattern--particle",background_media:"",gradient:"light"}};h.storyName="Background pattern";const p={...f,args:{...s.args,buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]}};p.storyName="Multiple buttons";const Q=a=>({components:{UidsGrid:ne,UidsGridItem:ie,UidsBanner:w,ExampleImage:R,ExampleVideoFile:j},setup(){return{args:a}},template:`
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :gradient="args.gradient"
            :height="args.height"
            :extra_padding="args.extra_padding"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              ${a.background_media}
            </template>
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            ${a.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),g=Q.bind({});g.args={...s.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};g.storyName="Background image grid";const c=Q.bind({});c.args={...s.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]};c.storyName="Background video grid";var S,P,C;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Template,
  args: {
    background: '',
    background_media: \`<example-image />\`,
    pre_title: 'University of Iowa',
    title: 'Living on Campus',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline_style: 'serif',
    headline_highlight: false,
    headline_size: 'large',
    horizontal_alignment: 'center',
    vertical_alignment: 'center',
    gradient: 'dark',
    height: 'large',
    extra_padding: false,
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    buttons: [{
      ...ButtonStories.Primary.args,
      label: 'Read More ' + ButtonStories.Primary.args.icon,
      color: 'primary'
    }]
  }
}`,...(C=(P=s.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var L,T,I;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(I=(T=u.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var M,U,E;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light'
  }
}`,...(E=(U=h.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};var V,A,H;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    buttons: [{
      ...ButtonStories.Primary.args,
      label: 'Apply ' + ButtonStories.Primary.args.icon
    }, {
      ...ButtonStories.Primary.args,
      label: 'Learn More ' + ButtonStories.Primary.args.icon,
      url: 'https://uiowa.edu/about'
    }, {
      ...ButtonStories.Primary.args,
      label: 'Explore ' + ButtonStories.Primary.args.icon,
      url: 'https://uiowa.edu/explore'
    }]
  }
}`,...(H=(A=p.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var G,D,N;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`args => ({
  components: {
    UidsGrid,
    UidsGridItem,
    UidsBanner,
    ExampleImage,
    ExampleVideoFile
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :gradient="args.gradient"
            :height="args.height"
            :extra_padding="args.extra_padding"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              \${args.background_media}
            </template>
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(N=(D=g.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var O,F,q;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`args => ({
  components: {
    UidsGrid,
    UidsGridItem,
    UidsBanner,
    ExampleImage,
    ExampleVideoFile
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :gradient="args.gradient"
            :height="args.height"
            :extra_padding="args.extra_padding"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              \${args.background_media}
            </template>
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(q=(F=c.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};const xe=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","GridImage","GridVideo"];export{s as BackgroundImage,h as BackgroundPattern,u as BackgroundVideo,g as GridImage,c as GridVideo,p as MultipleButtons,xe as __namedExportsOrder,ze as default};
