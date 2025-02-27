import{d as Y,s as ee,k as v,v as te,c as s,l as d,f as $,n as k,m,a as ae,b as C,o as r,p as M,F as ne,x as ie}from"./vue.esm-bundler--ETYdinE.js";import{_ as oe}from"./Button.vue_vue_type_script_setup_true_lang-DZHdLx2E.js";import{_ as re}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as le,_ as se}from"./click-a11y-BPbdm7Kw.js";import{B}from"./_background-C8gmGjFP.js";import{_ as de,a as ge}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as Z,a as J}from"./ExampleVideoFile-DZeII_Fv.js";import{Primary as i}from"./Button.stories-CunxMXqt.js";import"./utlity-CAV5GFHh.js";/* empty css               */(function(){const t=matchMedia("(prefers-reduced-motion)");function e(n,l){n&&(this.element=n,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+l,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+l,e.reducedMotionCheck(this.video,this.video_btn),t.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(n,l){t.matches&&(n.pause(),this.setButtonDataPlay(l))},e.pausePlay=function(n,l){n.paused?(n.play(),e.setButtonDataPaused(l)):(n.pause(),e.setButtonDataPlay(l))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const b=document.getElementsByClassName("media--video");for(let n=0;n<b.length;n++)new UidsVideo(b[n],n)})();const ce={class:"banner__content"},me={key:0,class:"banner__title"},ue=["href"],he={key:1,class:"banner__text"},pe={key:2,class:"banner__action"},_e={key:1,class:"bttn--row"},be=["innerHTML"],w=Y({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(t){return["primary","secondary","tertiary","transparent"].indexOf(t)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(t){return["","btt","ttb","ltr"].indexOf(t)!==-1}},media_overlay_light:{type:Boolean,default:!1},height:{type:String,default:""},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(t){const e=t,b=ee(),n=v(()=>{let a=["banner"];return B.addBackgroundClass(a,e),e.buttons.length===1&&a.push("click-container"),e.height&&a.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&a.push("banner--stacked"),e.horizontal_alignment&&a.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&a.push(`banner--vertical-${e.vertical_alignment}`),b.media&&(e.media_overlay_type&&a.push(`banner--overlay-${e.media_overlay_type}`),e.media_overlay_light&&a.push("banner--overlay-light")),a}),l=v(()=>{const a=["headline","banner__pre-title"];if(e.headline_size&&a.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":a.push("headline--uppercase");break;case"serif":a.push("headline--serif");break}return a}),z=v(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return te(()=>{e.buttons.length>0&&le(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((S,y)=>{new window.UidsVideo(S,y)})}),(a,S)=>(r(),s("div",{class:k(n.value)},[d(a.$slots,"media"),$("div",ce,[a.$slots.title||a.$slots.pre_title?(r(),s("header",me,[a.$slots.pre_title?(r(),s("div",{key:0,class:k(l.value)},[d(a.$slots,"pre_title")],2)):m("",!0),ae(re,{text_style:t.headline_style,highlight:t.headline_highlight,class:k(`headline--${e.headline_size}`)},{default:C(()=>[z.value?(r(),s("a",{key:0,href:z.value,class:"click-target"},[d(a.$slots,"title")],8,ue)):d(a.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):m("",!0),a.$slots.default?(r(),s("div",he,[d(a.$slots,"default")])):m("",!0),t.buttons.length>0||a.$slots.buttons?(r(),s("footer",pe,[d(a.$slots,"buttons",{},()=>[t.buttons.length===1?(r(),M(se,{key:0,size:"medium",color:t.button_color,light_font:t.button_light_font,innerHTML:t.buttons[0].label},null,8,["color","light_font","innerHTML"])):t.buttons.length>0?(r(),s("div",_e,[(r(!0),s(ne,null,ie(t.buttons,(y,ye)=>(r(),M(oe,{url:y.url,size:"medium",color:t.button_color,light_font:t.button_light_font},{default:C(()=>[$("span",{innerHTML:y.label},null,8,be)]),_:2},1032,["url","color","light_font"]))),256))])):m("",!0)])])):m("",!0)])],2))}}),Pe={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:w,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(B.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...B.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{name:"Section background",options:["","bg--black","bg--black--pattern--brain","bg--black--pattern--community","bg--black--pattern--particle","bg--gold","bg--gold--pattern--brain","bg--gold--pattern--community","bg--gold--pattern--particle","bg--gray","bg--gray--pattern--brain","bg--gray--pattern--community","bg--gray--pattern--particle","bg--white","bg--white--pattern--brain","bg--white--pattern--community","bg--white--pattern--particle"],control:{type:"select",labels:{"":"- None -","bg--black":"Black","bg--black--pattern--brain":"Black - Brain pattern","bg--black--pattern--community":"Black - Community pattern","bg--black--pattern--particle":"Black - Particle pattern","bg--gold":"Gold","bg--gold--pattern--brain":"Gold - Brain pattern","bg--gold--pattern--community":"Gold - Community pattern","bg--gold--pattern--particle":"Gold - Particle pattern","bg--gray":"Gray","bg--gray--pattern--brain":"Gray - Brain pattern","bg--gray--pattern--community":"Gray - Community pattern","bg--gray--pattern--particle":"Gray - Particle pattern","bg--white":"White","bg--white--pattern--brain":"White - Brain pattern","bg--white--pattern--community":"White - Community pattern","bg--white--pattern--particle":"White - Particle pattern"}},table:{category:"Container"}},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},_={render:t=>({components:{UidsBanner:w,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:t}},template:`
      <div class="column-container" :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
        <uids-banner
          :background="args.background"
          :headline_style="args.headline_style"
          :headline_size="args.headline_size"
          :headline_highlight="args.headline_highlight"
          :media_overlay_type="args.media_overlay_type"
          :media_overlay_light="args.media_overlay_light"
          :height="args.height"
          :horizontal_alignment="args.horizontal_alignment"
          :vertical_alignment="args.vertical_alignment"
          :buttons="args.buttons"
          :button_light_font="args.button_light_font"
          :button_color="args.button_color"
          :mobile_content_below_image="args.mobile_content_below_image"
        >
          <template #media v-if="args.background === ''">
            ${t.background_media}
          </template>
          <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
          <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
          ${t.content}
        </uids-banner>
      </div>`})},o={..._,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Living on Campus",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"center",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...i.args,label:"Read More "+i.args.icon,color:"primary"}],section_background:""}};o.storyName="Background image";const u={..._,args:{...o.args,background_media:"<example-video-file />"}};u.storyName="Background video";const h={..._,args:{...o.args,background:"gold--pattern--particle",background_media:""}};h.storyName="Background pattern";const p={..._,args:{...o.args,buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]}};p.storyName="Multiple buttons";const f={..._,args:{...o.args,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3>Heading 3</h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},X=t=>({components:{UidsGrid:de,UidsGridItem:ge,UidsBanner:w,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:t}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              ${t.background_media}
            </template>
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            ${t.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),g=X.bind({});g.args={...o.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};g.storyName="Background image grid";const c=X.bind({});c.args={...o.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]};c.storyName="Background video grid";var P,H,T;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
    media_overlay_type: '',
    media_overlay_light: false,
    height: 'large',
    mobile_content_below_image: true,
    button_light_font: false,
    button_color: 'primary',
    buttons: [{
      ...ButtonStories.Primary.args,
      label: 'Read More ' + ButtonStories.Primary.args.icon,
      color: 'primary'
    }],
    section_background: ''
  }
}`,...(T=(H=o.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};var U,I,A;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(A=(I=u.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var L,G,x;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(x=(G=h.parameters)==null?void 0:G.docs)==null?void 0:x.source}}};var E,N,V;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(V=(N=p.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var q,O,D;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3>Heading 3</h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(D=(O=f.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var F,W,K;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
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
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
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
})`,...(K=(W=g.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var R,j,Q;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`args => ({
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
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :background="args.background"
            :headline_style="args.headline_style"
            :headline_size="args.headline_size"
            :headline_highlight="args.headline_highlight"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
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
})`,...(Q=(j=c.parameters)==null?void 0:j.docs)==null?void 0:Q.source}}};const He=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{o as BackgroundImage,h as BackgroundPattern,u as BackgroundVideo,g as GridImage,c as GridVideo,f as KitchenSink,p as MultipleButtons,He as __namedExportsOrder,Pe as default};
