import{d as Z,s as Q,k as f,B as j,c as s,f as _,p as d,q as o,n as g,a as J,b as k,l as z,o as i,e as u,t as c}from"./vue.esm-bundler-B_OG6i5n.js";import{_ as C}from"./Button.vue_vue_type_script_setup_true_lang--NIkMegI.js";import{_ as K}from"./Headline.vue_vue_type_script_setup_true_lang-Bv-0cPYD.js";import{a as R,_ as X,c as M}from"./122-S3i8Oajx.js";import{B as S}from"./_background-BVWt7A6x.js";import{M as Y}from"./media-PjSUOf2n.js";import"./utlity-CAV5GFHh.js";(function(){const t=matchMedia("(prefers-reduced-motion)");function e(a,l){a&&(this.element=a,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+l,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+l,e.reducedMotionCheck(this.video,this.video_btn),t.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(a,l){t.matches&&(a.pause(),this.setButtonDataPlay(l))},e.pausePlay=function(a,l){a.paused?(a.play(),e.setButtonDataPaused(l)):(a.pause(),e.setButtonDataPlay(l))},e.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=e;const v=document.getElementsByClassName("media--video");for(let a=0;a<v.length;a++)new UidsVideo(v[a],a)})();const ee={key:0,class:"video-controls video"},te={key:0,class:"video-btn video-btn__pause",id:"video-btn-pause"},ne={key:1,class:"video-btn video-btn__play",id:"video-btn-play"},ae={class:"banner__container"},ie={class:"banner__content"},le={key:0,class:"banner__title"},oe=["href"],re={key:1,class:"banner__text"},se={key:2,class:"banner__action"},de={key:0,class:"bttn--row"},F=Z({__name:"Banner",props:{pre_title:{type:String,default:""},title:{type:String,default:""},content:{type:String},url:{type:String},url_2:{type:String},url_3:{type:String},button_label:{type:String},button_label_2:{type:String},button_label_3:{type:String},button_icon:{type:String,default:""},button_color:{type:String,default:"primary",validator:function(t){return["primary","secondary","tertiary","transparent"].indexOf(t)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},content_position:{type:String,default:""},gradient:{type:String,default:""},height:{type:String,default:""},mobile_content_below_image:{type:Boolean,default:!1},enable_autoplay:{type:Boolean,default:!1},media_type:{type:String,default:""},...S.props,...Y.props},setup(t){const e=t,v=Q(),a=f(()=>{let n=["banner"];switch(S.addBackgroundClass(n,e),(e.url||e.url_2)&&n.push("click-container"),e.gradient&&n.push(`banner--gradient-${e.gradient}`),e.height&&n.push(`banner--${e.height}`),e.media_type&&n.push(`banner--${e.media_type}`),e.mobile_content_below_image===!0&&n.push("banner--stacked"),e.content_position){case"center-center":n.push("banner--vertical-center","banner--horizontal-center","banner--gradient-bottom");break;case"center-bottom":n.push("banner--vertical-bottom","banner--horizontal-center","banner--gradient-bottom");break;case"left-center":n.push("banner--vertical-center","banner--horizontal-left","banner--gradient-left");break;case"left-bottom":n.push("banner--vertical-bottom","banner--horizontal-left","banner--gradient-left");break;default:n.push("banner--vertical-center","banner--horizontal-left","banner--gradient-left")}return n}),l=f(()=>{const n=[];if(e.headline_size&&n.push(`headline--${e.headline_size}`),e.gradient==="dark"?n.push("headline--negative"):e.gradient==="light"&&n.push("headline--positive"),e.headline_style)switch(e.headline_style){case"uppercase-highlight":n.push("headline--uppercase","headline--highlight");break;case"serif-highlight":n.push("headline--serif","headline--highlight");break;case"uppercase":n.push("headline--uppercase");break;case"serif":n.push("headline--serif");break}return n});f(()=>!e.url&&!e.url_2&&!e.url_3?null:v.title?"title":e.button_label?"button":v.media?"image":"button");const L=f(()=>e.url&&(e.url_2||e.url_3)?!1:e.url?e.url:e.url_2?e.url_2:e.url_3?e.url_3:!1),B=f(()=>{const n=[];return e.button_light_font&&n.push("bttn--light-font"),e.button_color&&n.push(`bttn--${e.button_color}`),n});return j(()=>{(e.url||e.url_2)&&R(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".banner__image.media--video").forEach((p,O)=>{new window.UidsVideo(p,O)})}),(n,p)=>(i(),s("div",{class:g(a.value)},[_("div",{class:g(["banner__image",{"media--video":t.media_type==="video","media--image":t.media_type!=="video"}])},[d(n.$slots,"media"),t.media_type==="video"?(i(),s("div",ee,[t.enable_autoplay===!0?(i(),s("button",te,p[0]||(p[0]=[_("span",{class:"element-invisible"},"Pause",-1)]))):o("",!0),t.enable_autoplay===!1?(i(),s("button",ne,p[1]||(p[1]=[_("span",{class:"element-invisible"},"Play",-1)]))):o("",!0)])):o("",!0)],2),_("div",ae,[_("div",ie,[n.$slots.title||t.title?(i(),s("header",le,[_("div",{class:g([l.value,"banner__pre-title","headline"])},[d(n.$slots,"pre_title",{},()=>[u(c(t.pre_title),1)])],2),J(K,{text_style:t.headline_style,class:g(l.value)},{default:k(()=>[L.value?(i(),s("a",{key:0,href:L.value,class:"click-target"},[d(n.$slots,"title",{},()=>[u(c(t.title),1)])],8,oe)):d(n.$slots,"title",{key:1},()=>[u(c(t.title),1)])]),_:3},8,["text_style","class"])])):o("",!0),t.content?(i(),s("div",re,[d(n.$slots,"content",{},()=>[u(c(t.content),1)])])):o("",!0),t.button_label||t.button_label_2||t.button_label_3?(i(),s("footer",se,[t.url&&(t.url_2||t.url_3)?(i(),s("div",de,[t.url&&t.button_label?(i(),z(C,{key:0,class:g(["bttn",...B.value]),url:t.url,no_default_classes:!0,size:"medium"},{default:k(()=>[d(n.$slots,"button_label",{},()=>[u(c(t.button_label),1)]),d(n.$slots,"button_icon")]),_:3},8,["class","url"])):o("",!0),t.url_2&&t.button_label_2?(i(),z(C,{key:1,class:g(["bttn",...B.value]),url:t.url_2,no_default_classes:!0,size:"medium"},{default:k(()=>[u(c(t.button_label_2)+" ",1),d(n.$slots,"button_icon")]),_:3},8,["class","url"])):o("",!0),t.url_3&&t.button_label_3?(i(),z(C,{key:2,class:g(["bttn",...B.value]),url:t.url_3,no_default_classes:!0,size:"medium"},{default:k(()=>[u(c(t.button_label_3)+" ",1),d(n.$slots,"button_icon")]),_:3},8,["class","url"])):o("",!0)])):t.url&&!t.url_2&&!t.url_3?(i(),z(X,{key:1,class:g(B.value)},{default:k(()=>[u(c(t.button_label),1)]),_:1},8,["class"])):o("",!0)])):o("",!0)])])],2))}}),ge="/branches/banner-component/assets/homepage-loop-BGGphxsM.mp4",ye={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:F,tags:["autodocs"],argTypes:{pre_title:{name:"Pre-title",control:{type:"text"}},title:{name:"Title",control:{type:"text"}},content:{name:"Excerpt",control:{type:"text"}},url:{name:"First link",control:{type:"text"}},url_2:{name:"Second link",control:{type:"text"}},url_3:{name:"Third link",control:{type:"text"}},button_label:{name:"First link text",control:{type:"text"}},button_label_2:{name:"Second link text",control:{type:"text"}},button_label_3:{name:"Third link text",control:{type:"text"}},button_icon:{name:"Button icon",control:{type:"text"}},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Display options"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Display options"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Display options"}},headline_style:{name:"Headline options",options:["uppercase","uppercase-highlight","serif","serif-highlight",""],control:{type:"select",labels:{uppercase:"Antonio","uppercase-highlight":"Antonio highlighted",serif:"Zilla Slab","serif-highlight":"Zilla Slab highlighted"}},table:{category:"Display options"}},content_position:{name:"Content Position",options:["center-center","center-bottom","left-center","left-bottom"],control:{type:"select",labels:{"center-bottom":"Centered horizontally and bottom-aligned vertically","left-center":"Left-aligned and centered vertically","left-bottom":"Left-aligned horizontally and bottom-aligned vertically","center-center":"Centered horizontally and vertically"}},table:{category:"Display options"}},gradient:{name:"Gradient",options:["dark","light"],control:{type:"select"},table:{category:"Display options"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},mobile_content_below_image:{name:"[Mobile] Content Below Image/Video",control:{type:"boolean"},table:{category:"Display options"}},enable_autoplay:{name:"Enable autoplay for video",control:{type:"boolean"},table:{category:"Media"}},media:{name:"Media",control:"text",table:{category:"Media"}},media_type:{name:"Media type",options:["","video"],control:{type:"select",labels:{"":"Image (default)",video:"Video"}},table:{category:"Media"}},media_poster:{name:"Media poster",control:{type:"text"},table:{category:"Media"}},section_background:{name:"Section background",options:["","bg--black","bg--black--pattern--brain","bg--black--pattern--community","bg--black--pattern--particle","bg--gold","bg--gold--pattern--brain","bg--gold--pattern--community","bg--gold--pattern--particle","bg--gray","bg--gray--pattern--brain","bg--gray--pattern--community","bg--gray--pattern--particle","bg--white","bg--white--pattern--brain","bg--white--pattern--community","bg--white--pattern--particle"],control:{type:"select",labels:{"":"- None -","bg--black":"Black","bg--black--pattern--brain":"Black - Brain pattern","bg--black--pattern--community":"Black - Community pattern","bg--black--pattern--particle":"Black - Particle pattern","bg--gold":"Gold","bg--gold--pattern--brain":"Gold - Brain pattern","bg--gold--pattern--community":"Gold - Community pattern","bg--gold--pattern--particle":"Gold - Particle pattern","bg--gray":"Gray","bg--gray--pattern--brain":"Gray - Brain pattern","bg--gray--pattern--community":"Gray - Community pattern","bg--gray--pattern--particle":"Gray - Particle pattern","bg--white":"White","bg--white--pattern--brain":"White - Brain pattern","bg--white--pattern--community":"White - Community pattern","bg--white--pattern--particle":"White - Particle pattern"}},table:{category:"Container"}},...S.argTypes}},w=t=>({components:{UidsBanner:F},setup(){return{args:t}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
    <uids-banner
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  `}),r=w.bind({});r.args={pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference<br> since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers<br> in the country, as well as globally recognized leadership in the study and craft of writing.</p>',url:"https://uiowa.edu/",url_2:"https://uiowa.edu/about",url_3:"https://uiowa.edu/explore",button_label:"Apply",button_label_2:"Learn More",button_label_3:"Explore",button_icon:'<i class="fas fa-arrow-right"></i>',button_color:"primary",button_light_font:!1,headline_style:"serif",headline_size:"large",background:"",content_position:"center-center",gradient:"dark",height:"large",media:'<img src="'+M+'" alt="Alt">',media_type:"",media_poster:M,mobile_content_below_image:!1,enable_autoplay:!1,section_background:""};r.storyName="Centered horizontally and vertically w/ image";const b=w.bind({});b.args={...r.args,content_position:"center-bottom"};b.storyName="Centered horizontally and bottom-aligned vertically w/ image";const m=w.bind({});m.args={...r.args,content_position:"left-center"};m.storyName="Left-aligned and centered vertically w/ image";const h=w.bind({});h.args={...r.args,content_position:"left-bottom"};h.storyName="Left-aligned horizontally and bottom-aligned vertically w/ image";const y=w.bind({});y.args={...r.args,enable_autoplay:!0,media_type:"video",media:ge};y.storyName="Centered horizontally and vertically w/ video";var P,$,x;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
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
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  \`
})`,...(x=($=r.parameters)==null?void 0:$.docs)==null?void 0:x.source}}};var D,U,V;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
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
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  \`
})`,...(V=(U=b.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var A,G,N;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
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
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  \`
})`,...(N=(G=m.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var T,E,H;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
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
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  \`
})`,...(H=(E=h.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var q,I,W;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`args => ({
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
      :title="args.title"
      :content="args.content"
      :pre_title="args.pre_title"
      :url="args.url"
      :url_2="args.url_2"
      :url_3="args.url_3"
      :button_label="args.button_label"
      :button_label_2="args.button_label_2"
      :button_label_3="args.button_label_3"
      :button_icon="args.button_icon"
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
      <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-banner>
    </div>
  \`
})`,...(W=(I=y.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};const ve=["Centered","CenterBottom","LeftCenter","LeftBottom","Video"];export{b as CenterBottom,r as Centered,h as LeftBottom,m as LeftCenter,y as Video,ve as __namedExportsOrder,ye as default};
