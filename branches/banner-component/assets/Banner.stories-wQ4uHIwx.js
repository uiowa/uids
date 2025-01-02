import{d as I,s as D,k as f,v as E,c as s,l as u,f as d,n as y,m as g,a as U,b as O,o,p as B,F,x as N}from"./vue.esm-bundler--ETYdinE.js";import{_ as q}from"./Button.vue_vue_type_script_setup_true_lang-ChQE5Vxq.js";import{_ as R}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as j,_ as G}from"./click-a11y-CyDOAv-Y.js";import{B as v}from"./_background-RctfgKj_.js";import{_ as Q}from"./ExampleImage-BEq2icwx.js";import{Primary as l}from"./Button.stories-BLIwEfT1.js";/* empty css               */import"./utlity-CAV5GFHh.js";(function(){const a=matchMedia("(prefers-reduced-motion)");function e(n,r){n&&(this.element=n,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+r,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+r,e.reducedMotionCheck(this.video,this.video_btn),a.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(n,r){a.matches&&(n.pause(),this.setButtonDataPlay(r))},e.pausePlay=function(n,r){n.paused?(n.play(),e.setButtonDataPaused(r)):(n.pause(),e.setButtonDataPlay(r))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const i=document.getElementsByClassName("media--video");for(let n=0;n<i.length;n++)new UidsVideo(i[n],n)})();const Z={class:"banner__container"},J={class:"banner__content"},K={key:0,class:"banner__title"},W=["href"],X={key:1,class:"banner__text"},Y={key:2,class:"banner__action"},ee={key:1,class:"bttn--row"},V=I({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(a){return["primary","secondary","tertiary","transparent"].indexOf(a)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},gradient:{type:String,default:"dark",validator:function(a){return["dark","light"].indexOf(a)!==-1}},height:{type:String,default:""},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(a){const e=a;D();const i=f(()=>{let t=["banner"];return v.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.gradient&&e.background===""&&t.push(`banner--gradient-${e.gradient}`),e.height&&t.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.horizontal_alignment==="center"?t.push("banner--horizontal-center"):e.horizontal_alignment==="left"?t.push("banner--horizontal-left","banner--gradient-left"):t.push("banner--gradient-bottom"),e.vertical_alignment==="center"?t.push("banner--vertical-center"):e.vertical_alignment==="bottom"&&t.push("banner--vertical-bottom"),e.horizontal_alignment!=="left"&&t.push("banner--gradient-bottom"),t}),n=f(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),r=f(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return E(()=>{e.buttons.length>0&&j(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".banner__image.media--video").forEach((k,m)=>{new window.UidsVideo(k,m)})}),(t,k)=>(o(),s("div",{class:y(i.value)},[u(t.$slots,"media"),d("div",Z,[d("div",J,[t.$slots.title||t.$slots.pre_title?(o(),s("header",K,[t.$slots.pre_title?(o(),s("div",{key:0,class:y(n.value)},[u(t.$slots,"pre_title")],2)):g("",!0),U(R,{text_style:a.headline_style,highlight:a.headline_highlight,class:y(`headline--${e.headline_size}`)},{default:O(()=>[r.value?(o(),s("a",{key:0,href:r.value,class:"click-target"},[u(t.$slots,"title")],8,W)):u(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):g("",!0),t.$slots.default?(o(),s("div",X,[u(t.$slots,"default")])):g("",!0),a.buttons.length>0||t.$slots.buttons?(o(),s("footer",Y,[u(t.$slots,"buttons",{},()=>[a.buttons.length===1?(o(),B(G,{key:0,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:a.buttons[0].label},null,8,["color","light_font","innerHTML"])):a.buttons.length>0?(o(),s("div",ee,[(o(!0),s(F,null,N(a.buttons,(m,se)=>(o(),B(q,{url:m.url,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:m.label},null,8,["url","color","light_font","innerHTML"]))),256))])):g("",!0)])])):g("",!0)])])],2))}}),te={class:"media--video"},ne={class:"video-controls video"},ae={key:0,class:"video-btn video-btn__pause",id:"video-btn-pause"},oe={key:1,class:"video-btn video-btn__play",id:"video-btn-play"},ie={__name:"ExampleVideoFile",setup(a){return(e,i)=>(o(),s("div",te,[i[2]||(i[2]=d("video",{loop:"loop",muted:"muted",width:"1300",height:"730",poster:"https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png",playsinline:"playsinline",autoplay:"autoplay",id:"video-container-0"},[d("source",{src:"https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4",type:"video/mp4"})],-1)),d("div",ne,[e.enable_autoplay?(o(),s("button",ae,i[0]||(i[0]=[d("span",{class:"element-invisible"},"Pause",-1)]))):(o(),s("button",oe,i[1]||(i[1]=[d("span",{class:"element-invisible"},"Play",-1)])))])]))}},be={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:V,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(v.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...v.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["center","bottom"],control:{type:"select",labels:{center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},gradient:{name:"Gradient",default:"dark",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},mobile_content_below_image:{name:"Content below media (Mobile-only)",control:{type:"boolean"},table:{category:"Display options"}}}},_={render:a=>({components:{UidsBanner:V,ExampleImage:Q,ExampleVideoFile:ie},setup(){return{args:a}},template:`
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
        ${a.background_media}
      </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      ${a.content}
    </uids-banner>`})},c={..._,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",gradient:"dark",height:"large",mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...l.args,label:"Read More "+l.args.icon,color:"primary"}]}},p={..._,args:{...c.args,background_media:"<example-video-file />"}},h={..._,args:{...c.args,background:"gold--pattern--particle",background_media:"",gradient:"light"}},b={..._,args:{...c.args,buttons:[{...l.args,label:"Apply "+l.args.icon},{...l.args,label:"Learn More "+l.args.icon,url:"https://uiowa.edu/about"},{...l.args,label:"Explore "+l.args.icon,url:"https://uiowa.edu/explore"}]}};var w,z,S;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(S=(z=c.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var $,P,C;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(C=(P=p.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var L,M,T;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: '',
    gradient: 'light'
  }
}`,...(T=(M=h.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var A,H,x;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(x=(H=b.parameters)==null?void 0:H.docs)==null?void 0:x.source}}};const _e=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons"];export{c as BackgroundImage,h as BackgroundPattern,p as BackgroundVideo,b as MultipleButtons,_e as __namedExportsOrder,be as default};
