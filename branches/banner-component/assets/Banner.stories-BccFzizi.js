import{d as O,s as Z,k as v,B as Q,c as r,f as m,p as g,q as i,n as f,a as j,b as h,o as l,l as k,e as w,t as B}from"./vue.esm-bundler-B_OG6i5n.js";import{_ as z}from"./Button.vue_vue_type_script_setup_true_lang-BvRoqAc4.js";import{_ as J}from"./Headline.vue_vue_type_script_setup_true_lang-Bv-0cPYD.js";import{a as K,_ as R,c as L}from"./122-BLGhDRmK.js";import{B as C}from"./_background-BVWt7A6x.js";import{M as X}from"./media-PjSUOf2n.js";import"./utlity-CAV5GFHh.js";(function(){const e=matchMedia("(prefers-reduced-motion)");function t(a,o){a&&(this.element=a,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+o,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+o,t.reducedMotionCheck(this.video,this.video_btn),e.addListener(function(){t.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{t.pausePlay(this.video,this.video_btn)})))}t.reducedMotionCheck=function(a,o){e.matches&&(a.pause(),this.setButtonDataPlay(o))},t.pausePlay=function(a,o){a.paused?(a.play(),t.setButtonDataPaused(o)):(a.pause(),t.setButtonDataPlay(o))},t.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},t.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=t;const b=document.getElementsByClassName("media--video");for(let a=0;a<b.length;a++)new UidsVideo(b[a],a)})();const Y={key:0,class:"video-controls video"},ee={key:0,class:"video-btn video-btn__pause",id:"video-btn-pause"},te={key:1,class:"video-btn video-btn__play",id:"video-btn-play"},ne={class:"banner__container"},ae={class:"banner__content"},le={key:0,class:"banner__title"},ie=["href"],oe={key:1,class:"banner__text"},re={key:2,class:"banner__action"},se={key:0,class:"bttn--row"},W=O({__name:"Banner",props:{url:{type:String},url_2:{type:String},url_3:{type:String},button_label:{type:String},button_label_2:{type:String},button_label_3:{type:String},button_icon:{type:String,default:""},button_color:{type:String,default:"primary",validator:function(e){return["primary","secondary","tertiary","transparent"].indexOf(e)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},content_position:{type:String,default:""},gradient:{type:String,default:""},height:{type:String,default:""},mobile_content_below_image:{type:Boolean,default:!1},enable_autoplay:{type:Boolean,default:!1},media_type:{type:String,default:""},...C.props,...X.props},setup(e){const t=e,b=Z(),a=v(()=>{let n=["banner"];switch(C.addBackgroundClass(n,t),(t.url||t.url_2)&&n.push("click-container"),t.gradient&&n.push(`banner--gradient-${t.gradient}`),t.height&&n.push(`banner--${t.height}`),t.media_type&&n.push(`banner--${t.media_type}`),t.mobile_content_below_image===!0&&n.push("banner--stacked"),t.content_position){case"center-center":n.push("banner--vertical-center","banner--horizontal-center","banner--gradient-bottom");break;case"center-bottom":n.push("banner--vertical-bottom","banner--horizontal-center","banner--gradient-bottom");break;case"left-center":n.push("banner--vertical-center","banner--horizontal-left","banner--gradient-left");break;case"left-bottom":n.push("banner--vertical-bottom","banner--horizontal-left","banner--gradient-left");break;default:n.push("banner--vertical-center","banner--horizontal-left","banner--gradient-left")}return n}),o=v(()=>{const n=[];if(t.headline_size&&n.push(`headline--${t.headline_size}`),t.gradient==="dark"?n.push("headline--negative"):t.gradient==="light"&&n.push("headline--positive"),t.headline_style)switch(t.headline_style){case"uppercase-highlight":n.push("headline--uppercase","headline--highlight");break;case"serif-highlight":n.push("headline--serif","headline--highlight");break;case"uppercase":n.push("headline--uppercase");break;case"serif":n.push("headline--serif");break}return n});v(()=>!t.url&&!t.url_2&&!t.url_3?null:b.title?"title":t.button_label?"button":b.media?"image":"button");const S=v(()=>t.url&&(t.url_2||t.url_3)?!1:t.url?t.url:t.url_2?t.url_2:t.url_3?t.url_3:!1);return Q(()=>{(t.url||t.url_2)&&K(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".banner__image.media--video").forEach((d,F)=>{new window.UidsVideo(d,F)})}),(n,d)=>(l(),r("div",{class:f(a.value)},[m("div",{class:f(["banner__image",{"media--video":e.media_type==="video","media--image":e.media_type!=="video"}])},[g(n.$slots,"media"),e.media_type==="video"?(l(),r("div",Y,[e.enable_autoplay===!0?(l(),r("button",ee,d[0]||(d[0]=[m("span",{class:"element-invisible"},"Pause",-1)]))):i("",!0),e.enable_autoplay===!1?(l(),r("button",te,d[1]||(d[1]=[m("span",{class:"element-invisible"},"Play",-1)]))):i("",!0)])):i("",!0)],2),m("div",ne,[m("div",ae,[n.$slots.title||n.$slots.pre_title?(l(),r("header",le,[n.$slots.pre_title?(l(),r("div",{key:0,class:f([o.value,"banner__pre-title","headline"])},[g(n.$slots,"pre_title")],2)):i("",!0),j(J,{text_style:e.headline_style,class:f(o.value)},{default:h(()=>[S.value?(l(),r("a",{key:0,href:S.value,class:"click-target"},[g(n.$slots,"title")],8,ie)):g(n.$slots,"title",{key:1})]),_:3},8,["text_style","class"])])):i("",!0),n.$slots.content?(l(),r("div",oe,[g(n.$slots,"content")])):i("",!0),e.button_label||e.button_label_2||e.button_label_3?(l(),r("footer",re,[g(n.$slots,"buttons",{},()=>[e.url&&(e.url_2||e.url_3)?(l(),r("div",se,[e.url&&e.button_label?(l(),k(z,{key:0,url:e.url,color:e.button_color,light_font:e.button_light_font,size:"medium"},{default:h(()=>[w(B(e.button_label),1)]),_:1},8,["url","color","light_font"])):i("",!0),e.url_2&&e.button_label_2?(l(),k(z,{key:1,url:e.url_2,color:e.button_color,light_font:e.button_light_font,size:"medium"},{default:h(()=>[w(B(e.button_label_2),1)]),_:1},8,["url","color","light_font"])):i("",!0),e.url_3&&e.button_label_3?(l(),k(z,{key:2,url:e.url_3,color:e.button_color,light_font:e.button_light_font,size:"medium"},{default:h(()=>[w(B(e.button_label_3),1)]),_:1},8,["url","color","light_font"])):i("",!0)])):e.url&&!e.url_2&&!e.url_3?(l(),k(R,{key:1,color:e.button_color,light_font:e.button_light_font,size:"medium"},{default:h(()=>[w(B(e.button_label),1)]),_:1},8,["color","light_font"])):i("",!0)])])):i("",!0)])])],2))}}),de="/branches/banner-component/assets/homepage-loop-BGGphxsM.mp4",he={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:W,tags:["autodocs"],argTypes:{pre_title:{name:"Pre-title",control:{type:"text"}},title:{name:"Title",control:{type:"text"}},content:{name:"Excerpt",control:{type:"text"}},url:{name:"First link",control:{type:"text"}},url_2:{name:"Second link",control:{type:"text"}},url_3:{name:"Third link",control:{type:"text"}},button_label:{name:"First link text",control:{type:"text"}},button_label_2:{name:"Second link text",control:{type:"text"}},button_label_3:{name:"Third link text",control:{type:"text"}},button_icon:{name:"Button icon",control:{type:"text"}},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Display options"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Display options"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Display options"}},headline_style:{name:"Headline options",options:["uppercase","uppercase-highlight","serif","serif-highlight",""],control:{type:"select",labels:{uppercase:"Antonio","uppercase-highlight":"Antonio highlighted",serif:"Zilla Slab","serif-highlight":"Zilla Slab highlighted"}},table:{category:"Display options"}},content_position:{name:"Content Position",options:["center-center","center-bottom","left-center","left-bottom"],control:{type:"select",labels:{"center-bottom":"Centered horizontally and bottom-aligned vertically","left-center":"Left-aligned and centered vertically","left-bottom":"Left-aligned horizontally and bottom-aligned vertically","center-center":"Centered horizontally and vertically"}},table:{category:"Display options"}},gradient:{name:"Gradient",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},mobile_content_below_image:{name:"[Mobile] Content Below Image/Video",control:{type:"boolean"},table:{category:"Display options"}},enable_autoplay:{name:"Enable autoplay for video",control:{type:"boolean"},table:{category:"Media"}},media:{name:"Media",control:"text",table:{category:"Media"}},media_type:{name:"Media type",options:["","video"],control:{type:"select",labels:{"":"Image (default)",video:"Video"}},table:{category:"Media"}},media_poster:{name:"Media poster",control:{type:"text"},table:{category:"Media"}},section_background:{name:"Section background",options:["","bg--black","bg--black--pattern--brain","bg--black--pattern--community","bg--black--pattern--particle","bg--gold","bg--gold--pattern--brain","bg--gold--pattern--community","bg--gold--pattern--particle","bg--gray","bg--gray--pattern--brain","bg--gray--pattern--community","bg--gray--pattern--particle","bg--white","bg--white--pattern--brain","bg--white--pattern--community","bg--white--pattern--particle"],control:{type:"select",labels:{"":"- None -","bg--black":"Black","bg--black--pattern--brain":"Black - Brain pattern","bg--black--pattern--community":"Black - Community pattern","bg--black--pattern--particle":"Black - Particle pattern","bg--gold":"Gold","bg--gold--pattern--brain":"Gold - Brain pattern","bg--gold--pattern--community":"Gold - Community pattern","bg--gold--pattern--particle":"Gold - Particle pattern","bg--gray":"Gray","bg--gray--pattern--brain":"Gray - Brain pattern","bg--gray--pattern--community":"Gray - Community pattern","bg--gray--pattern--particle":"Gray - Particle pattern","bg--white":"White","bg--white--pattern--brain":"White - Brain pattern","bg--white--pattern--community":"White - Community pattern","bg--white--pattern--particle":"White - Particle pattern"}},table:{category:"Container"}},...C.argTypes}},y=e=>({components:{UidsBanner:W},setup(){return{args:e}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  `}),s=y.bind({});s.args={pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',url:"https://uiowa.edu/",url_2:"https://uiowa.edu/about",url_3:"https://uiowa.edu/explore",button_label:"Apply",button_label_2:"Learn More",button_label_3:"Explore",button_icon:'<i class="fas fa-arrow-right"></i>',button_color:"primary",button_light_font:!1,headline_style:"serif",headline_size:"large",background:"",content_position:"center-center",gradient:"dark",height:"large",media:'<img src="'+L+'" alt="Alt">',media_type:"",media_poster:L,mobile_content_below_image:!1,enable_autoplay:!1,section_background:""};s.storyName="Centered horizontally and vertically w/ image";const u=y.bind({});u.args={...s.args,content_position:"center-bottom"};u.storyName="Centered horizontally and bottom-aligned vertically w/ image";const c=y.bind({});c.args={...s.args,content_position:"left-center"};c.storyName="Left-aligned and centered vertically w/ image";const p=y.bind({});p.args={...s.args,content_position:"left-bottom"};p.storyName="Left-aligned horizontally and bottom-aligned vertically w/ image";const _=y.bind({});_.args={...s.args,enable_autoplay:!0,media_type:"video",media:de};_.storyName="Centered horizontally and vertically w/ video";var M,P,x;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`args => ({
  components: {
    UidsBanner
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  \`
})`,...(x=(P=s.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var $,D,U;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
  components: {
    UidsBanner
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  \`
})`,...(U=(D=u.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var V,A,G;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
  components: {
    UidsBanner
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  \`
})`,...(G=(A=c.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var N,T,E;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`args => ({
  components: {
    UidsBanner
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  \`
})`,...(E=(T=p.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var H,q,I;_.parameters={..._.parameters,docs:{...(H=_.parameters)==null?void 0:H.docs,source:{originalSource:`args => ({
  components: {
    UidsBanner
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_color="args.button_color"
      :button_light_font="args.button_light_font"
      :headline_style="args.headline_style"
      :headline_size="args.headline_size"
      :background="args.background"
      :content_position="args.content_position"
      :gradient="args.gradient"
      :height="args.height"
      :mobile_content_below_image="args.mobile_content_below_image"
      :media_type="args.media_type"
      :enable_autoplay="args.enable_autoplay"

    ><template #media v-if="args.media">
      <video
        v-if="args.media_type === 'video'"
        loop
        muted
        width="1300"
        height="730"
        :poster="args.media_poster"
        playsinline
        :autoplay="args.enable_autoplay ? true : undefined"
      >
        <source :src="args.media" type="video/mp4" />
      </video>
      <span v-else v-html="args.media"></span>
    </template>
      <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
      <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
      <template #content><div v-html="args.content"></div></template>
    </uids-banner>
    </div>
  \`
})`,...(I=(q=_.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};const ye=["Centered","CenterBottom","LeftCenter","LeftBottom","Video"];export{u as CenterBottom,s as Centered,p as LeftBottom,c as LeftCenter,_ as Video,ye as __namedExportsOrder,he as default};
