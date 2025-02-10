import{d as Z,k as y,v as J,c as l,l as d,f as v,n as k,m,a as K,b as x,o as r,p as $,F as W,x as X}from"./vue.esm-bundler--ETYdinE.js";import{_ as Y}from"./Button.vue_vue_type_script_setup_true_lang-ChQE5Vxq.js";import{_ as ee}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as te,_ as ne}from"./click-a11y-CyDOAv-Y.js";import{B}from"./_background-C8gmGjFP.js";import{_ as ae,a as ie}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as R,a as j}from"./ExampleVideoFile-qqG1yAt6.js";import{Primary as i}from"./Button.stories-Cxe31HQS.js";import"./utlity-CAV5GFHh.js";/* empty css               */(function(){const n=matchMedia("(prefers-reduced-motion)");function e(a,o){a&&(this.element=a,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+o,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+o,e.reducedMotionCheck(this.video,this.video_btn),n.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(a,o){n.matches&&(a.pause(),this.setButtonDataPlay(o))},e.pausePlay=function(a,o){a.paused?(a.play(),e.setButtonDataPaused(o)):(a.pause(),e.setButtonDataPlay(o))},e.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=e;const _=document.getElementsByClassName("media--video");for(let a=0;a<_.length;a++)new UidsVideo(_[a],a)})();const oe={class:"banner__container"},re={class:"banner__content"},se={key:0,class:"banner__title"},le=["href"],de={key:1,class:"banner__text"},ge={key:2,class:"banner__action"},ce={key:1,class:"bttn--row"},me=["innerHTML"],w=Z({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(n){return["primary","secondary","tertiary","transparent"].indexOf(n)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},gradient:{type:String,default:"dark",validator:function(n){return["dark","light"].indexOf(n)!==-1}},height:{type:String,default:""},extra_padding:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(n){const e=n,_=y(()=>{let t=["banner"];return B.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.gradient&&e.background===""&&t.push(`banner--gradient-${e.gradient}`),e.height&&t.push(`banner--${e.height}`),e.extra_padding&&t.push("banner--extra-padding"),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),e.background===""&&(e.horizontal_alignment==="left"?t.push("banner--gradient-left"):e.vertical_alignment==="top"?t.push("banner--gradient-top"):t.push("banner--gradient-bottom")),t}),a=y(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),o=y(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return J(()=>{e.buttons.length>0&&te(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((z,b)=>{new window.UidsVideo(z,b)})}),(t,z)=>(r(),l("div",{class:k(_.value)},[d(t.$slots,"media"),v("div",oe,[v("div",re,[t.$slots.title||t.$slots.pre_title?(r(),l("header",se,[t.$slots.pre_title?(r(),l("div",{key:0,class:k(a.value)},[d(t.$slots,"pre_title")],2)):m("",!0),K(ee,{text_style:n.headline_style,highlight:n.headline_highlight,class:k(`headline--${e.headline_size}`)},{default:x(()=>[o.value?(r(),l("a",{key:0,href:o.value,class:"click-target"},[d(t.$slots,"title")],8,le)):d(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):m("",!0),t.$slots.default?(r(),l("div",de,[d(t.$slots,"default")])):m("",!0),n.buttons.length>0||t.$slots.buttons?(r(),l("footer",ge,[d(t.$slots,"buttons",{},()=>[n.buttons.length===1?(r(),$(ne,{key:0,size:"medium",color:n.button_color,light_font:n.button_light_font,innerHTML:n.buttons[0].label},null,8,["color","light_font","innerHTML"])):n.buttons.length>0?(r(),l("div",ce,[(r(!0),l(W,null,X(n.buttons,(b,ue)=>(r(),$(Y,{url:b.url,size:"medium",color:n.button_color,light_font:n.button_light_font},{default:x(()=>[v("span",{innerHTML:b.label},null,8,me)]),_:2},1032,["url","color","light_font"]))),256))])):m("",!0)])])):m("",!0)])])],2))}}),ze={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:w,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(B.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...B.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},gradient:{name:"Gradient",default:"dark",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},extra_padding:{name:"Extra padding",control:{type:"boolean"}},mobile_content_below_image:{name:"Content below media (mobile-only)",control:{type:"boolean"},table:{category:"Display options"}},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},f={render:n=>({components:{UidsBanner:w,ExampleImage:R,ExampleVideoFile:j},setup(){return{args:n}},template:`
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
        ${n.background_media}
      </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      ${n.content}
    </uids-banner>
      </div>`})},s={...f,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",gradient:"dark",height:"large",extra_padding:!1,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...i.args,label:"Read More "+i.args.icon,color:"primary"}]}};s.storyName="Background image";const u={...f,args:{...s.args,background_media:"<example-video-file />"}};u.storyName="Background video";const p={...f,args:{...s.args,background:"gold--pattern--particle",background_media:"",gradient:"light"}};p.storyName="Background pattern";const h={...f,args:{...s.args,buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]}};h.storyName="Multiple buttons";const Q=n=>({components:{UidsGrid:ae,UidsGridItem:ie,UidsBanner:w,ExampleImage:R,ExampleVideoFile:j},setup(){return{args:n}},template:`
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
              ${n.background_media}
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),g=Q.bind({});g.args={...s.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};g.storyName="Background image grid";const c=Q.bind({});c.args={...s.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]};c.storyName="Background video grid";var S,C,U;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(U=(C=s.parameters)==null?void 0:C.docs)==null?void 0:U.source}}};var A,L,P;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(P=(L=u.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var I,T,M;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light'
  }
}`,...(M=(T=p.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var E,V,H;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(H=(V=h.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var D,G,N;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
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
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(N=(G=g.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var O,F,q;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`args => ({
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
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(q=(F=c.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};const xe=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","GridImage","GridVideo"];export{s as BackgroundImage,p as BackgroundPattern,u as BackgroundVideo,g as GridImage,c as GridVideo,h as MultipleButtons,xe as __namedExportsOrder,ze as default};
