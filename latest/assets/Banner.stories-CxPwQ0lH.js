import{B as M}from"./background-Dp_AVxiY.js";import{d as ee,u as te,c as p,z as ae,f as l,e as B,h as _,n as w,g as c,s as ne,b as P,A as oe,o as i,a as x,F as ie,x as re}from"./vue.esm-bundler-5zt9KcQM.js";import{_ as le}from"./Button.vue_vue_type_script_setup_true_lang-DgjTkWZU.js";import{_ as se}from"./Headline.vue_vue_type_script_setup_true_lang-BrgiQv0B.js";import{a as de,_ as ce}from"./click-a11y-DwGktfiC.js";/* empty css                    */import{_ as me,a as ue}from"./GridItem.vue_vue_type_script_setup_true_lang-HrSPefm7.js";import{_ as X,a as Y}from"./ExampleVideoFile-Chxyespt.js";import ge from"./Background.stories-D2Xxl9VM.js";import{Primary as s}from"./Button.stories-BZL2pXqM.js";import{Default as he}from"./Headline.stories-BKIVoVlQ.js";import"./utlity-BIMoNfdw.js";/* empty css               *//* empty css                  *//* empty css              *//* empty css               */(function(){const t=matchMedia("(prefers-reduced-motion)");function e(a,r){if(a&&(this.element=a,this.video=this.element.querySelector("video"),this.video)){this.video.id=this.video.id+"-"+r,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+r,e.reducedMotionCheck(this.video,this.video_btn),t.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)});const d=this;this.video_btn.addEventListener("click",function(){e.pausePlay(d.video,d.video_btn)}),this.video.addEventListener("pause",function(){e.setButtonDataPlay(d.video_btn)}),this.video.addEventListener("play",function(){e.setButtonDataPaused(d.video_btn)}),this.video.paused?e.setButtonDataPlay(this.video_btn):e.setButtonDataPaused(this.video_btn)}}e.reducedMotionCheck=function(a,r){t.matches&&(a.pause(),this.setButtonDataPlay(r))},e.pausePlay=function(a,r){a.paused?(a.play(),e.setButtonDataPaused(r)):(a.pause(),e.setButtonDataPlay(r))},e.setButtonDataPaused=function(a){a.innerHTML="<span class='element-invisible'>Pause</span>",a.classList.remove("video-btn__play"),a.classList.add("video-btn__pause"),a.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(a){a.innerHTML="<span class='element-invisible'>Play</span>",a.classList.remove("video-btn__pause"),a.classList.add("video-btn__play"),a.setAttribute("aria-label","Play")},window.UidsVideo=e;const g=document.getElementsByClassName("media--video");for(let a=0;a<g.length;a++)new UidsVideo(g[a],a)})();const pe={class:"banner__content"},_e={key:0,class:"banner__title"},be=["innerHTML"],ye=["href"],fe=["innerHTML"],ve=["innerHTML"],ke={key:1,class:"banner__text"},Be={key:2,class:"banner__action"},we={key:1,class:"bttn--row"},Me=["innerHTML"],S=ee({__name:"Banner",props:{headline:{type:Object,default:()=>({text:"",level:"h2",text_style:"",size:"large",highlight:!1,underline:!1,url:""})},pre_title:{type:String,default:""},buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(t){return["primary","secondary","tertiary","transparent"].indexOf(t)!==-1}},button_light_font:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(t){return["","btt","ttb","ltr"].indexOf(t)!==-1}},media_overlay_light:{type:Boolean,default:!1},media_overlay_midpoint:{type:String,default:""},height:{type:String,default:""},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(t){const e=t,g=te(),a=p(()=>{const n={};return e.media_overlay_midpoint&&(n["--banner-overlay-gradient-midpoint"]=e.media_overlay_midpoint),n}),r=p(()=>{let n=["banner"];return M.addBackgroundClass(n,e),e.buttons.length===1&&n.push("click-container"),e.height&&n.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&n.push("banner--stacked"),e.narrow&&n.push("banner--narrow"),e.horizontal_alignment&&n.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&n.push(`banner--vertical-${e.vertical_alignment}`),e.media_overlay_light&&n.push("banner--overlay-light"),g.media&&e.media_overlay_type&&n.push(`banner--overlay-${e.media_overlay_type}`),n}),d=p(()=>{const n=["headline","banner__pre-title"];if(e.headline.size&&n.push(`headline--${e.headline.size}`),e.headline.text_style)switch(e.headline.text_style){case"uppercase":n.push("headline--uppercase");break;case"serif":n.push("headline--serif");break}return n}),T=p(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return ae(()=>{e.buttons.length>0&&de(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((z,h)=>{new window.UidsVideo(z,h)})}),(n,z)=>(i(),l("div",{class:w(r.value),style:oe(a.value)},[B(n.$slots,"media"),_("div",pe,[t.pre_title||t.headline.text?(i(),l("header",_e,[t.pre_title?(i(),l("div",{key:0,class:w(d.value)},[_("span",{class:"headline__heading",innerHTML:t.pre_title},null,8,be)],2)):c("",!0),ne(se,{level:t.headline.level,text_style:t.headline.text_style,highlight:t.headline.highlight,underline:t.headline.underline,class:w(`headline--${t.headline.size}`)},{default:P(()=>[T.value?(i(),l("a",{key:0,href:T.value,class:"click-target"},[_("span",{class:"headline__heading",innerHTML:t.headline.text},null,8,fe)],8,ye)):(i(),l("span",{key:1,class:"headline__heading",innerHTML:t.headline.text},null,8,ve))]),_:1},8,["level","text_style","highlight","underline","class"])])):c("",!0),n.$slots.default?(i(),l("div",ke,[B(n.$slots,"default")])):c("",!0),t.buttons.length>0||n.$slots.buttons?(i(),l("footer",Be,[B(n.$slots,"buttons",{},()=>[t.buttons.length===1?(i(),x(ce,{key:0,size:"medium",color:t.button_color,light_font:t.button_light_font,innerHTML:t.buttons[0].label},null,8,["color","light_font","innerHTML"])):t.buttons.length>0?(i(),l("div",we,[(i(!0),l(ie,null,re(t.buttons,(h,Se)=>(i(),x(le,{url:h.url,size:"medium",color:t.button_color,light_font:t.button_light_font},{default:P(()=>[_("span",{innerHTML:h.label},null,8,Me)]),_:2},1032,["url","color","light_font"]))),256))])):c("",!0)])])):c("",!0)])],6))}}),Ne={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:S,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(M.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...M.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_midpoint:{name:"Overlay gradient midpoint",options:["","20%","30%","40%","50%","60%","70%"],control:{type:"select",labels:{"":"Default","20%":"20%","30%":"30%","40%":"40% default for bottom to top and top to bottom","50%":"50%","60%":"60%","70%":"70% default for left to right"}},table:{category:"Media"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},narrow:{name:"Narrow",table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{...ge.argTypes.section_background},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},u={render:t=>({components:{UidsBanner:S,ExampleImage:X,ExampleVideoFile:Y},setup(){return{args:t}},template:`
      <div class="column-container" :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
        <uids-banner
          :headline="args.headline"
          :pre_title="args.pre_title"
          :background="args.background"
          :media_overlay_type="args.media_overlay_type"
          :media_overlay_light="args.media_overlay_light"
          :media_overlay_midpoint="args.media_overlay_midpoint"
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
            ${t.background_media}
          </template>
          <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
          ${t.content}
        </uids-banner>
      </div>`})},o={...u,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline:he.args,horizontal_alignment:"left",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",media_overlay_midpoint:"",buttons:[{...s.args,label:"Read More "+s.args.icon,color:"primary"}],section_background:""}};o.storyName="Background image";const b={name:"Background video",...u,args:{...o.args,background_media:"<example-video-file />"}},y={name:"Background pattern",...u,args:{...o.args,background:"gold--pattern--particle",background_media:""}},m={name:"Multiple buttons",...u,args:{...o.args,buttons:[{...s.args,label:"Apply "+s.args.icon},{...s.args,label:"Learn More "+s.args.icon,url:"https://uiowa.edu/about"},{...s.args,label:"Explore "+s.args.icon,url:"https://uiowa.edu/explore"}]}},f={...u,args:{...o.args,headline:{...o.args.headline,highlight:!0},content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},Z={render:t=>({components:{UidsGrid:me,UidsGridItem:ue,UidsBanner:S,ExampleImage:X,ExampleVideoFile:Y},setup(){return{args:t}},template:`
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
              ${t.background_media}
            </template>
            ${t.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `})},v={name:"Background image grid",...Z,args:{...o.args,headline:{...o.args.headline,size:"medium"},grid_type:"threecol--33-34-33",record_count:3,height:"medium"}},k={name:"Background video grid",...Z,args:{...o.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:m.args.buttons}};var L,H,I;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
    media_overlay_midpoint: '',
    buttons: [{
      ...ButtonStories.Primary.args,
      label: 'Read More ' + ButtonStories.Primary.args.icon,
      color: 'primary'
    }],
    section_background: ''
  }
}`,...(I=(H=o.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var $,C,A;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: 'Background video',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(A=(C=b.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var D,U,V;y.parameters={...y.parameters,docs:{...(D=y.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Background pattern',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(V=(U=y.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var E,O,q;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(q=(O=m.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var N,G,F;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      highlight: true
    },
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(F=(G=f.parameters)==null?void 0:G.docs)==null?void 0:F.source}}};var j,K,R;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(R=(K=v.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var Q,J,W;k.parameters={...k.parameters,docs:{...(Q=k.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(W=(J=k.parameters)==null?void 0:J.docs)==null?void 0:W.source}}};const Ge=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{o as BackgroundImage,y as BackgroundPattern,b as BackgroundVideo,v as GridImage,k as GridVideo,f as KitchenSink,m as MultipleButtons,Ge as __namedExportsOrder,Ne as default};
