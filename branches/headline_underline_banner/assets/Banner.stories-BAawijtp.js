import{d as ee,s as te,k,v as ne,c as l,l as B,f,n as w,m as u,a as ae,b as T,o as i,p as H,F as oe,x as ie}from"./vue.esm-bundler--ETYdinE.js";import{_ as re}from"./Button.vue_vue_type_script_setup_true_lang-DZHdLx2E.js";import{_ as se}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as le,_ as de}from"./click-a11y-BPbdm7Kw.js";import{B as x}from"./background-DvwhyV5E.js";/* empty css                    */import{_ as ce,a as ge}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as W,a as X}from"./ExampleVideoFile-DZeII_Fv.js";import{Primary as o}from"./Button.stories-CunxMXqt.js";import ue from"./Background.stories-CAHXKGmp.js";import"./utlity-CAV5GFHh.js";/* empty css               */import"./Stub.vue_vue_type_script_setup_true_lang-BouT5YQp.js";(function(){const e=matchMedia("(prefers-reduced-motion)");function t(n,s){if(n&&(this.element=n,this.video=this.element.querySelector("video"),this.video)){this.video.id=this.video.id+"-"+s,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+s,t.reducedMotionCheck(this.video,this.video_btn),e.addListener(function(){t.reducedMotionCheck(this.video,this.video_btn)});const d=this;this.video_btn.addEventListener("click",function(){t.pausePlay(d.video,d.video_btn)}),this.video.addEventListener("pause",function(){t.setButtonDataPlay(d.video_btn)}),this.video.addEventListener("play",function(){t.setButtonDataPaused(d.video_btn)}),this.video.paused?t.setButtonDataPlay(this.video_btn):t.setButtonDataPaused(this.video_btn)}}t.reducedMotionCheck=function(n,s){e.matches&&(n.pause(),this.setButtonDataPlay(s))},t.pausePlay=function(n,s){n.paused?(n.play(),t.setButtonDataPaused(s)):(n.pause(),t.setButtonDataPlay(s))},t.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},t.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=t;const b=document.getElementsByClassName("media--video");for(let n=0;n<b.length;n++)new UidsVideo(b[n],n)})();const me={class:"banner__content"},he={key:0,class:"banner__title"},_e=["innerHTML"],pe=["href"],be=["innerHTML"],ye=["innerHTML"],fe={key:1,class:"banner__text"},ve={key:2,class:"banner__action"},ke={key:1,class:"bttn--row"},Be=["innerHTML"],M=ee({__name:"Banner",props:{headline:{type:Object,default:()=>({text:"",level:"h2",text_style:"",size:"large",highlight:!1,underline:!1,url:""})},pre_title:{type:String,default:""},buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(e){return["primary","secondary","tertiary","transparent"].indexOf(e)!==-1}},button_light_font:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(e){return["","btt","ttb","ltr"].indexOf(e)!==-1}},media_overlay_light:{type:Boolean,default:!1},height:{type:String,default:""},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(e){const t=e,b=te(),n=k(()=>{let a=["banner"];return x.addBackgroundClass(a,t),t.buttons.length===1&&a.push("click-container"),t.height&&a.push(`banner--${t.height}`),t.mobile_content_below_image===!0&&a.push("banner--stacked"),t.narrow&&a.push("banner--narrow"),t.horizontal_alignment&&a.push(`banner--horizontal-${t.horizontal_alignment}`),t.vertical_alignment&&a.push(`banner--vertical-${t.vertical_alignment}`),t.media_overlay_light&&a.push("banner--overlay-light"),b.media&&t.media_overlay_type&&a.push(`banner--overlay-${t.media_overlay_type}`),a}),s=k(()=>{const a=["headline","banner__pre-title"];if(t.headline.size&&a.push(`headline--${t.headline.size}`),t.headline.text_style)switch(t.headline.text_style){case"uppercase":a.push("headline--uppercase");break;case"serif":a.push("headline--serif");break}return a}),d=k(()=>t.buttons.length>1?!1:t.buttons[0].url||!1);return ne(()=>{t.buttons.length>0&&le(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((S,y)=>{new window.UidsVideo(S,y)})}),(a,S)=>(i(),l("div",{class:w(n.value)},[B(a.$slots,"media"),f("div",me,[e.pre_title||e.headline.text?(i(),l("header",he,[e.pre_title?(i(),l("div",{key:0,class:w(s.value)},[f("span",{class:"headline__heading",innerHTML:e.pre_title},null,8,_e)],2)):u("",!0),ae(se,{level:e.headline.level,text_style:e.headline.text_style,highlight:e.headline.highlight,underline:e.headline.underline,class:w(`headline--${e.headline.size}`)},{default:T(()=>[d.value?(i(),l("a",{key:0,href:d.value,class:"click-target"},[f("span",{class:"headline__heading",innerHTML:e.headline.text},null,8,be)],8,pe)):(i(),l("span",{key:1,class:"headline__heading",innerHTML:e.headline.text},null,8,ye))]),_:1},8,["level","text_style","highlight","underline","class"])])):u("",!0),a.$slots.default?(i(),l("div",fe,[B(a.$slots,"default")])):u("",!0),e.buttons.length>0||a.$slots.buttons?(i(),l("footer",ve,[B(a.$slots,"buttons",{},()=>[e.buttons.length===1?(i(),H(de,{key:0,size:"medium",color:e.button_color,light_font:e.button_light_font,innerHTML:e.buttons[0].label},null,8,["color","light_font","innerHTML"])):e.buttons.length>0?(i(),l("div",ke,[(i(!0),l(oe,null,ie(e.buttons,(y,we)=>(i(),H(re,{url:y.url,size:"medium",color:e.button_color,light_font:e.button_light_font},{default:T(()=>[f("span",{innerHTML:y.label},null,8,Be)]),_:2},1032,["url","color","light_font"]))),256))])):u("",!0)])])):u("",!0)])],2))}}),z=(e={})=>({text:"Your path to success starts here",level:"h2",text_style:"serif",size:"large",highlight:!1,underline:!1,url:"",...e}),Ee={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:M,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(x.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...x.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},narrow:{name:"Narrow",table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{...ue.argTypes.section_background},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},p={render:e=>({components:{UidsBanner:M,ExampleImage:W,ExampleVideoFile:X},setup(){return{args:e}},template:`
      <div class="column-container" :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
        <uids-banner
          :headline="args.headline"
          :pre_title="args.pre_title"
          :background="args.background"
          :media_overlay_type="args.media_overlay_type"
          :media_overlay_light="args.media_overlay_light"
          :height="args.height"
          :narrow="args.narrow"
          :horizontal_alignment="args.horizontal_alignment"
          :vertical_alignment="args.vertical_alignment"
          :buttons="args.buttons"
          :button_light_font="args.button_light_font"
          :button_color="args.button_color"
          :mobile_content_below_image="args.mobile_content_below_image"
        >
          <template #media v-if="args.background === ''">
            ${e.background_media}
          </template>
          <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
          ${e.content}
        </uids-banner>
      </div>`})},r={...p,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline:z(),horizontal_alignment:"left",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...o.args,label:"Read More "+o.args.icon,color:"primary"}],section_background:""}};r.storyName="Background image";const m={...p,args:{...r.args,background_media:"<example-video-file />"}};m.storyName="Background video";const h={...p,args:{...r.args,background:"gold--pattern--particle",background_media:""}};h.storyName="Background pattern";const _={...p,args:{...r.args,buttons:[{...o.args,label:"Apply "+o.args.icon},{...o.args,label:"Learn More "+o.args.icon,url:"https://uiowa.edu/about"},{...o.args,label:"Explore "+o.args.icon,url:"https://uiowa.edu/explore"}]}};_.storyName="Multiple buttons";const v={...p,args:{...r.args,headline:z({highlight:!0}),content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},Z=e=>({components:{UidsGrid:ce,UidsGridItem:ge,UidsBanner:M,ExampleImage:W,ExampleVideoFile:X},setup(){return{args:e}},template:`
    <div :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-banner
            :pre_title="args.pre_title"
            :headline="args.headline"
            :background="args.background"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
            :narrow="args.narrow"
            :horizontal_alignment="args.horizontal_alignment"
            :vertical_alignment="args.vertical_alignment"
            :buttons="args.buttons"
            :button_light_font="args.button_light_font"
            :button_color="args.button_color"
            :mobile_content_below_image="args.mobile_content_below_image"
          >
            <template #media v-if="args.background === ''">
              ${e.background_media}
            </template>
            ${e.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),c=Z.bind({});c.args={...r.args,headline:z({size:"medium"}),grid_type:"threecol--33-34-33",record_count:3,height:"medium"};c.storyName="Background image grid";const g=Z.bind({});g.args={...r.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...o.args,label:"Apply "+o.args.icon},{...o.args,label:"Learn More "+o.args.icon,url:"https://uiowa.edu/about"},{...o.args,label:"Explore "+o.args.icon,url:"https://uiowa.edu/explore"}]};g.storyName="Background video grid";var L,P,$;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    background: '',
    background_media: \`<example-image />\`,
    pre_title: 'University of Iowa',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline: createHeadline(),
    horizontal_alignment: 'left',
    vertical_alignment: 'center',
    media_overlay_type: '',
    media_overlay_light: false,
    height: 'large',
    narrow: true,
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
}`,...($=(P=r.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};var I,U,C;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(C=(U=m.parameters)==null?void 0:U.docs)==null?void 0:C.source}}};var A,E,N;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(N=(E=h.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var V,D,G;_.parameters={..._.parameters,docs:{...(V=_.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(G=(D=_.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var q,O,F;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: createHeadline({
      highlight: true
    }),
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(F=(O=v.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var j,K,R;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`args => ({
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
            :pre_title="args.pre_title"
            :headline="args.headline"
            :background="args.background"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
            :narrow="args.narrow"
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
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(R=(K=c.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var Q,Y,J;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`args => ({
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
            :pre_title="args.pre_title"
            :headline="args.headline"
            :background="args.background"
            :media_overlay_type="args.media_overlay_type"
            :media_overlay_light="args.media_overlay_light"
            :height="args.height"
            :narrow="args.narrow"
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
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(J=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};const Ne=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{r as BackgroundImage,h as BackgroundPattern,m as BackgroundVideo,c as GridImage,g as GridVideo,v as KitchenSink,_ as MultipleButtons,Ne as __namedExportsOrder,Ee as default};
