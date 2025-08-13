import{B as M}from"./background-DvwhyV5E.js";import{d as Z,s as ee,g as k,x as te,c as s,j as B,f as p,n as w,q as c,a as ae,b as z,o as i,h as P,F as ne,y as oe}from"./vue.esm-bundler-5gA9mrtU.js";import{_ as ie}from"./Button.vue_vue_type_script_setup_true_lang-BWl288u-.js";import{_ as re}from"./Headline.vue_vue_type_script_setup_true_lang-b-xPzzYP.js";import{a as se,_ as le}from"./click-a11y-Dgm_hNdV.js";/* empty css                    */import{_ as de,a as ce}from"./GridItem.vue_vue_type_script_setup_true_lang-CgypWNrW.js";import{_ as W,a as X}from"./ExampleVideoFile-BMKA_mVF.js";import ue from"./Background.stories-2KIsXJbM.js";import{Primary as l}from"./Button.stories-DTDVcc9f.js";import{Default as me}from"./Headline.stories-DQr2QaQs.js";import"./utlity-CAV5GFHh.js";/* empty css                  *//* empty css              *//* empty css               */import"./Stub.vue_vue_type_script_setup_true_lang-BE1mOXaI.js";(function(){const e=matchMedia("(prefers-reduced-motion)");function t(a,r){if(a&&(this.element=a,this.video=this.element.querySelector("video"),this.video)){this.video.id=this.video.id+"-"+r,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+r,t.reducedMotionCheck(this.video,this.video_btn),e.addListener(function(){t.reducedMotionCheck(this.video,this.video_btn)});const d=this;this.video_btn.addEventListener("click",function(){t.pausePlay(d.video,d.video_btn)}),this.video.addEventListener("pause",function(){t.setButtonDataPlay(d.video_btn)}),this.video.addEventListener("play",function(){t.setButtonDataPaused(d.video_btn)}),this.video.paused?t.setButtonDataPlay(this.video_btn):t.setButtonDataPaused(this.video_btn)}}t.reducedMotionCheck=function(a,r){e.matches&&(a.pause(),this.setButtonDataPlay(r))},t.pausePlay=function(a,r){a.paused?(a.play(),t.setButtonDataPaused(r)):(a.pause(),t.setButtonDataPlay(r))},t.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},t.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=t;const g=document.getElementsByClassName("media--video");for(let a=0;a<g.length;a++)new UidsVideo(g[a],a)})();const ge={class:"banner__content"},he={key:0,class:"banner__title"},pe=["innerHTML"],_e=["href"],be=["innerHTML"],fe=["innerHTML"],ye={key:1,class:"banner__text"},ve={key:2,class:"banner__action"},ke={key:1,class:"bttn--row"},Be=["innerHTML"],T=Z({__name:"Banner",props:{headline:{type:Object,default:()=>({text:"",level:"h2",text_style:"",size:"large",highlight:!1,underline:!1,url:""})},pre_title:{type:String,default:""},buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(e){return["primary","secondary","tertiary","transparent"].indexOf(e)!==-1}},button_light_font:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(e){return["","btt","ttb","ltr"].indexOf(e)!==-1}},media_overlay_light:{type:Boolean,default:!1},height:{type:String,default:""},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(e){const t=e,g=ee(),a=k(()=>{let n=["banner"];return M.addBackgroundClass(n,t),t.buttons.length===1&&n.push("click-container"),t.height&&n.push(`banner--${t.height}`),t.mobile_content_below_image===!0&&n.push("banner--stacked"),t.narrow&&n.push("banner--narrow"),t.horizontal_alignment&&n.push(`banner--horizontal-${t.horizontal_alignment}`),t.vertical_alignment&&n.push(`banner--vertical-${t.vertical_alignment}`),t.media_overlay_light&&n.push("banner--overlay-light"),g.media&&t.media_overlay_type&&n.push(`banner--overlay-${t.media_overlay_type}`),n}),r=k(()=>{const n=["headline","banner__pre-title"];if(t.headline.size&&n.push(`headline--${t.headline.size}`),t.headline.text_style)switch(t.headline.text_style){case"uppercase":n.push("headline--uppercase");break;case"serif":n.push("headline--serif");break}return n}),d=k(()=>t.buttons.length>1?!1:t.buttons[0].url||!1);return te(()=>{t.buttons.length>0&&se(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((S,h)=>{new window.UidsVideo(S,h)})}),(n,S)=>(i(),s("div",{class:w(a.value)},[B(n.$slots,"media"),p("div",ge,[e.pre_title||e.headline.text?(i(),s("header",he,[e.pre_title?(i(),s("div",{key:0,class:w(r.value)},[p("span",{class:"headline__heading",innerHTML:e.pre_title},null,8,pe)],2)):c("",!0),ae(re,{level:e.headline.level,text_style:e.headline.text_style,highlight:e.headline.highlight,underline:e.headline.underline,class:w(`headline--${e.headline.size}`)},{default:z(()=>[d.value?(i(),s("a",{key:0,href:d.value,class:"click-target"},[p("span",{class:"headline__heading",innerHTML:e.headline.text},null,8,be)],8,_e)):(i(),s("span",{key:1,class:"headline__heading",innerHTML:e.headline.text},null,8,fe))]),_:1},8,["level","text_style","highlight","underline","class"])])):c("",!0),n.$slots.default?(i(),s("div",ye,[B(n.$slots,"default")])):c("",!0),e.buttons.length>0||n.$slots.buttons?(i(),s("footer",ve,[B(n.$slots,"buttons",{},()=>[e.buttons.length===1?(i(),P(le,{key:0,size:"medium",color:e.button_color,light_font:e.button_light_font,innerHTML:e.buttons[0].label},null,8,["color","light_font","innerHTML"])):e.buttons.length>0?(i(),s("div",ke,[(i(!0),s(ne,null,oe(e.buttons,(h,we)=>(i(),P(ie,{url:h.url,size:"medium",color:e.button_color,light_font:e.button_light_font},{default:z(()=>[p("span",{innerHTML:h.label},null,8,Be)]),_:2},1032,["url","color","light_font"]))),256))])):c("",!0)])])):c("",!0)])],2))}}),qe={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:T,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(M.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...M.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},narrow:{name:"Narrow",table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{...ue.argTypes.section_background},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},m={render:e=>({components:{UidsBanner:T,ExampleImage:W,ExampleVideoFile:X},setup(){return{args:e}},template:`
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
      </div>`})},o={...m,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline:me.args,horizontal_alignment:"left",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...l.args,label:"Read More "+l.args.icon,color:"primary"}],section_background:""}};o.storyName="Background image";const _={name:"Background video",...m,args:{...o.args,background_media:"<example-video-file />"}},b={name:"Background pattern",...m,args:{...o.args,background:"gold--pattern--particle",background_media:""}},u={name:"Multiple buttons",...m,args:{...o.args,buttons:[{...l.args,label:"Apply "+l.args.icon},{...l.args,label:"Learn More "+l.args.icon,url:"https://uiowa.edu/about"},{...l.args,label:"Explore "+l.args.icon,url:"https://uiowa.edu/explore"}]}},f={...m,args:{...o.args,headline:{...o.args.headline,highlight:!0},content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},Y={render:e=>({components:{UidsGrid:de,UidsGridItem:ce,UidsBanner:T,ExampleImage:W,ExampleVideoFile:X},setup(){return{args:e}},template:`
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
  `})},y={name:"Background image grid",...Y,args:{...o.args,headline:{...o.args.headline,size:"medium"},grid_type:"threecol--33-34-33",record_count:3,height:"medium"}},v={name:"Background video grid",...Y,args:{...o.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:u.args.buttons}};var x,L,H;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...Template,
  args: {
    background: '',
    background_media: \`<example-image />\`,
    pre_title: 'University of Iowa',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline: HeadlineStories.Default.args,
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
}`,...(H=(L=o.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var I,$,C;_.parameters={..._.parameters,docs:{...(I=_.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Background video',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(C=($=_.parameters)==null?void 0:$.docs)==null?void 0:C.source}}};var A,U,D;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Background pattern',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(D=(U=b.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var V,E,q;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Multiple buttons',
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
}`,...(q=(E=u.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var N,O,G;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      highlight: true
    },
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(G=(O=f.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var F,j,K;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Background image grid',
  ...GridTemplate,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      size: 'medium'
    },
    grid_type: 'threecol--33-34-33',
    record_count: 3,
    height: 'medium'
  }
}`,...(K=(j=y.parameters)==null?void 0:j.docs)==null?void 0:K.source}}};var R,Q,J;v.parameters={...v.parameters,docs:{...(R=v.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'Background video grid',
  ...GridTemplate,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`,
    grid_type: 'threecol--33-34-33',
    record_count: 3,
    height: 'medium',
    headline_size: 'medium',
    horizontal_alignment: 'left',
    vertical_alignment: 'bottom',
    buttons: MultipleButtons.args.buttons
  }
}`,...(J=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:J.source}}};const Ne=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{o as BackgroundImage,b as BackgroundPattern,_ as BackgroundVideo,y as GridImage,v as GridVideo,f as KitchenSink,u as MultipleButtons,Ne as __namedExportsOrder,qe as default};
