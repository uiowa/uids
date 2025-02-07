import{d as O,k as f,v as F,c as s,l as d,f as y,n as v,m as c,a as q,b as z,o,p as S,F as R,x as j}from"./vue.esm-bundler--ETYdinE.js";import{_ as Q}from"./Button.vue_vue_type_script_setup_true_lang-ChQE5Vxq.js";import{_ as Z}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as J,_ as K}from"./click-a11y-CyDOAv-Y.js";import{B as k}from"./_background-C8gmGjFP.js";import{_ as W,a as X}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as N,a as Y}from"./ExampleVideoFile-qqG1yAt6.js";import{Primary as l}from"./Button.stories-Cxe31HQS.js";import"./utlity-CAV5GFHh.js";/* empty css               */(function(){const a=matchMedia("(prefers-reduced-motion)");function e(n,i){n&&(this.element=n,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+i,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+i,e.reducedMotionCheck(this.video,this.video_btn),a.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(n,i){a.matches&&(n.pause(),this.setButtonDataPlay(i))},e.pausePlay=function(n,i){n.paused?(n.play(),e.setButtonDataPaused(i)):(n.pause(),e.setButtonDataPlay(i))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const p=document.getElementsByClassName("media--video");for(let n=0;n<p.length;n++)new UidsVideo(p[n],n)})();const ee={class:"banner__container"},te={class:"banner__content"},ae={key:0,class:"banner__title"},ne=["href"],ie={key:1,class:"banner__text"},oe={key:2,class:"banner__action"},re={key:1,class:"bttn--row"},se=["innerHTML"],B=O({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(a){return["primary","secondary","tertiary","transparent"].indexOf(a)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},gradient:{type:String,default:"dark",validator:function(a){return["dark","light"].indexOf(a)!==-1}},height:{type:String,default:""},extra_padding:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(a){const e=a,p=f(()=>{let t=["banner"];return k.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.gradient&&e.background===""&&t.push(`banner--gradient-${e.gradient}`),e.height&&t.push(`banner--${e.height}`),e.extra_padding&&t.push("banner--extra-padding"),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),e.background===""&&(e.horizontal_alignment==="left"?t.push("banner--gradient-left"):e.vertical_alignment==="top"?t.push("banner--gradient-top"):t.push("banner--gradient-bottom")),t}),n=f(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),i=f(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return F(()=>{e.buttons.length>0&&J(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((w,_)=>{new window.UidsVideo(w,_)})}),(t,w)=>(o(),s("div",{class:v(p.value)},[d(t.$slots,"media"),y("div",ee,[y("div",te,[t.$slots.title||t.$slots.pre_title?(o(),s("header",ae,[t.$slots.pre_title?(o(),s("div",{key:0,class:v(n.value)},[d(t.$slots,"pre_title")],2)):c("",!0),q(Z,{text_style:a.headline_style,highlight:a.headline_highlight,class:v(`headline--${e.headline_size}`)},{default:z(()=>[i.value?(o(),s("a",{key:0,href:i.value,class:"click-target"},[d(t.$slots,"title")],8,ne)):d(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):c("",!0),t.$slots.default?(o(),s("div",ie,[d(t.$slots,"default")])):c("",!0),a.buttons.length>0||t.$slots.buttons?(o(),s("footer",oe,[d(t.$slots,"buttons",{},()=>[a.buttons.length===1?(o(),S(K,{key:0,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:a.buttons[0].label},null,8,["color","light_font","innerHTML"])):a.buttons.length>0?(o(),s("div",re,[(o(!0),s(R,null,j(a.buttons,(_,de)=>(o(),S(Q,{url:_.url,size:"medium",color:a.button_color,light_font:a.button_light_font},{default:z(()=>[y("span",{innerHTML:_.label},null,8,se)]),_:2},1032,["url","color","light_font"]))),256))])):c("",!0)])])):c("",!0)])])],2))}}),ve={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:B,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(k.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...k.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},gradient:{name:"Gradient",default:"dark",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},extra_padding:{name:"Extra padding",control:{type:"boolean"}},mobile_content_below_image:{name:"Content below media (mobile-only)",control:{type:"boolean"},table:{category:"Display options"}},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},b={render:a=>({components:{UidsBanner:B,ExampleImage:N,ExampleVideoFile:Y},setup(){return{args:a}},template:`
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
      </div>`})},r={...b,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",gradient:"dark",height:"large",extra_padding:!1,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...l.args,label:"Read More "+l.args.icon,color:"primary"}]}};r.storyName="Background image";const g={...b,args:{...r.args,background_media:"<example-video-file />"}};g.storyName="Background video";const m={...b,args:{...r.args,background:"gold--pattern--particle",background_media:"",gradient:"light"}};m.storyName="Background pattern";const u={...b,args:{...r.args,buttons:[{...l.args,label:"Apply "+l.args.icon},{...l.args,label:"Learn More "+l.args.icon,url:"https://uiowa.edu/about"},{...l.args,label:"Explore "+l.args.icon,url:"https://uiowa.edu/explore"}]}};u.storyName="Multiple buttons";const le=a=>({components:{UidsGrid:W,UidsGridItem:X,UidsBanner:B,ExampleImage:N},setup(){return{args:a}},template:`
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
              <example-image />
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),h=le.bind({});h.args={...r.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};var $,x,C;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(C=(x=r.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var P,L,A;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(A=(L=g.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var T,U,M;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light'
  }
}`,...(M=(U=m.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};var I,H,D;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(D=(H=u.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var E,V,G;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`args => ({
  components: {
    UidsGrid,
    UidsGridItem,
    UidsBanner,
    ExampleImage
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
              <example-image />
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <template #title><span class="headline__heading">Living on Campus</span></template>
            <p>A member of the Association of American Universities since 1909. Discover the rich academic tradition and vibrant campus life.</p>
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(G=(V=h.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};const ke=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","Grid"];export{r as BackgroundImage,m as BackgroundPattern,g as BackgroundVideo,h as Grid,u as MultipleButtons,ke as __namedExportsOrder,ve as default};
