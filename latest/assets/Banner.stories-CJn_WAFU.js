import{d as U,k as b,v as E,c as r,l as c,f,n as y,m as d,a as x,b as B,o,p as w,F as N,x as O}from"./vue.esm-bundler--ETYdinE.js";import{_ as q}from"./Button.vue_vue_type_script_setup_true_lang-DZHdLx2E.js";import{_ as F}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as R,_ as j}from"./click-a11y-BPbdm7Kw.js";import{B as v}from"./_background-DMs6KDNX.js";import{_ as G,a as Q}from"./ExampleVideoFile-qqG1yAt6.js";import{Primary as s}from"./Button.stories-CunxMXqt.js";import"./utlity-CAV5GFHh.js";/* empty css               */(function(){const n=matchMedia("(prefers-reduced-motion)");function e(a,i){a&&(this.element=a,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+i,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+i,e.reducedMotionCheck(this.video,this.video_btn),n.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(a,i){n.matches&&(a.pause(),this.setButtonDataPlay(i))},e.pausePlay=function(a,i){a.paused?(a.play(),e.setButtonDataPaused(i)):(a.pause(),e.setButtonDataPlay(i))},e.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=e;const h=document.getElementsByClassName("media--video");for(let a=0;a<h.length;a++)new UidsVideo(h[a],a)})();const Z={class:"banner__container"},J={class:"banner__content"},K={key:0,class:"banner__title"},W=["href"],X={key:1,class:"banner__text"},Y={key:2,class:"banner__action"},ee={key:1,class:"bttn--row"},te=["innerHTML"],D=U({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(n){return["primary","secondary","tertiary","transparent"].indexOf(n)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},gradient:{type:String,default:"dark",validator:function(n){return["dark","light"].indexOf(n)!==-1}},height:{type:String,default:""},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(n){const e=n,h=b(()=>{let t=["banner"];return v.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.gradient&&e.background===""&&t.push(`banner--gradient-${e.gradient}`),e.height&&t.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),e.horizontal_alignment==="left"?t.push("banner--gradient-left"):t.push("banner--gradient-bottom"),t}),a=b(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),i=b(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return E(()=>{e.buttons.length>0&&R(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((k,p)=>{new window.UidsVideo(k,p)})}),(t,k)=>(o(),r("div",{class:y(h.value)},[c(t.$slots,"media"),f("div",Z,[f("div",J,[t.$slots.title||t.$slots.pre_title?(o(),r("header",K,[t.$slots.pre_title?(o(),r("div",{key:0,class:y(a.value)},[c(t.$slots,"pre_title")],2)):d("",!0),x(F,{text_style:n.headline_style,highlight:n.headline_highlight,class:y(`headline--${e.headline_size}`)},{default:B(()=>[i.value?(o(),r("a",{key:0,href:i.value,class:"click-target"},[c(t.$slots,"title")],8,W)):c(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):d("",!0),t.$slots.default?(o(),r("div",X,[c(t.$slots,"default")])):d("",!0),n.buttons.length>0||t.$slots.buttons?(o(),r("footer",Y,[c(t.$slots,"buttons",{},()=>[n.buttons.length===1?(o(),w(j,{key:0,size:"medium",color:n.button_color,light_font:n.button_light_font,innerHTML:n.buttons[0].label},null,8,["color","light_font","innerHTML"])):n.buttons.length>0?(o(),r("div",ee,[(o(!0),r(N,null,O(n.buttons,(p,ae)=>(o(),w(q,{url:p.url,size:"medium",color:n.button_color,light_font:n.button_light_font},{default:B(()=>[f("span",{innerHTML:p.label},null,8,te)]),_:2},1032,["url","color","light_font"]))),256))])):d("",!0)])])):d("",!0)])])],2))}}),ge={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:D,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(v.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...v.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["center","bottom"],control:{type:"select",labels:{center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},gradient:{name:"Gradient",default:"dark",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},mobile_content_below_image:{name:"Content below media (mobile-only)",control:{type:"boolean"},table:{category:"Display options"}}}},_={render:n=>({components:{UidsBanner:D,ExampleImage:G,ExampleVideoFile:Q},setup(){return{args:n}},template:`
    <uids-banner
      :background="args.background"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :headline_highlight="args.headline_highlight"
      :gradient="args.gradient"
      :height="args.height"
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
    </uids-banner>`})},l={..._,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",gradient:"dark",height:"large",mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...s.args,label:"Read More "+s.args.icon,color:"primary"}]}};l.storyName="Background image";const u={..._,args:{...l.args,background_media:"<example-video-file />"}};u.storyName="Background video";const g={..._,args:{...l.args,background:"gold--pattern--particle",background_media:"",gradient:"light"}};g.storyName="Background pattern";const m={..._,args:{...l.args,buttons:[{...s.args,label:"Apply "+s.args.icon},{...s.args,label:"Learn More "+s.args.icon,url:"https://uiowa.edu/about"},{...s.args,label:"Explore "+s.args.icon,url:"https://uiowa.edu/explore"}]}};m.storyName="Multiple buttons";var z,S,$;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...Template,
  args: {
    background: '',
    background_media: \`<example-image />\`,
    pre_title: 'University of Iowa',
    title: 'Living on Campus',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline_style: 'serif',
    headline_highlight: false,
    headline_size: 'large',
    horizontal_alignment: 'center',
    vertical_alignment: 'center',
    gradient: 'dark',
    height: 'large',
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    buttons: [{
      ...ButtonStories.Primary.args,
      label: 'Read More ' + ButtonStories.Primary.args.icon,
      color: 'primary'
    }]
  }
}`,...($=(S=l.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var P,C,L;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(L=(C=u.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var M,T,A;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light'
  }
}`,...(A=(T=g.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var H,I,V;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(V=(I=m.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};const me=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons"];export{l as BackgroundImage,g as BackgroundPattern,u as BackgroundVideo,m as MultipleButtons,me as __namedExportsOrder,ge as default};
