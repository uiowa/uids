import{i as e}from"./preload-helper-Dk23HbNT.js";import{J as t,K as n,Q as r,X as i,Y as a,Z as o,_t as ee,at as te,ct as s,dt as ne,ft as c,gt as l,nt as u,ot as d,q as re,st as ie,tt as ae}from"./iframe-AEN7zgRT.js";import{t as f}from"./_background-D0jEC4lf.js";import p,{t as m}from"./Background.stories-dP2SPSFj.js";import{n as h,t as g}from"./background-mXsU_RFb.js";import{n as oe,t as se}from"./Button-7-lQ4vR3.js";import{n as _,t as ce}from"./Headline-DSoR4WlW.js";import{i as le,n as ue,r as v,t as y}from"./click-a11y-C7ooi_qy.js";import{i as b,n as x,r as S,t as C}from"./GridItem-CQSGt2B5.js";import{i as w,n as T,r as E,t as D}from"./ExampleVideoFile-BfQzxDsM.js";import{Primary as O,t as de}from"./Button.stories-BkHuYryb.js";import{Default as fe,t as pe}from"./Headline.stories-D0rmXlM8.js";var me=e((()=>{})),k=e((()=>{(function(){let e=matchMedia(`(prefers-reduced-motion)`);function t(n,r){if(n&&(this.element=n,this.video=this.element.querySelector(`.banner video`),this.video)){this.video.id=this.video.id+`-`+r,this.video_btn=this.element.querySelector(`.video-controls .video-btn`),this.video_btn.id=this.video_btn.id+`-`+r,t.reducedMotionCheck(this.video,this.video_btn),e.addListener(function(){t.reducedMotionCheck(this.video,this.video_btn)});let n=this;this.video_btn.addEventListener(`click`,function(){t.pausePlay(n.video,n.video_btn)}),this.video.addEventListener(`pause`,function(){t.setButtonDataPlay(n.video_btn)}),this.video.addEventListener(`play`,function(){t.setButtonDataPaused(n.video_btn)}),this.video.paused?t.setButtonDataPlay(this.video_btn):t.setButtonDataPaused(this.video_btn)}}t.reducedMotionCheck=function(t,n){e.matches&&(t.pause(),this.setButtonDataPlay(n))},t.pausePlay=function(e,n){e.paused?(e.play(),t.setButtonDataPaused(n)):(e.pause(),t.setButtonDataPlay(n))},t.setButtonDataPaused=function(e){e.innerHTML=`<span class='element-invisible'>Pause</span>`,e.classList.remove(`video-btn__play`),e.classList.add(`video-btn__pause`),e.setAttribute(`aria-label`,`Pause`)},t.setButtonDataPlay=function(e){e.innerHTML=`<span class='element-invisible'>Play</span>`,e.classList.remove(`video-btn__pause`),e.classList.add(`video-btn__play`),e.setAttribute(`aria-label`,`Play`)},window.UidsVideo=t;let n=document.getElementsByClassName(`media--video`);for(let e=0;e<n.length;e++)new UidsVideo(n[e],e)})()})),A,j,M,N,P,F,I,L,R,z,B,V=e((()=>{n(),oe(),_(),le(),h(),me(),f(),k(),ue(),A={class:`banner__content`},j={key:0,class:`banner__title`},M=[`innerHTML`],N=[`href`],P=[`innerHTML`],F=[`innerHTML`],I={key:1,class:`banner__text`},L={key:2,class:`banner__action`},R={key:1,class:`bttn--row`},z=[`innerHTML`],B=u({__name:`Banner`,props:{headline:{type:Object,default:()=>({text:``,level:`h2`,text_style:``,size:`large`,highlight:!1,underline:!1,url:``})},pre_title:{type:String,default:``},buttons:{type:Array,default:()=>[]},button_color:{type:String,default:`primary`,validator:function(e){return[`primary`,`secondary`,`tertiary`,`transparent`].indexOf(e)!==-1}},button_light_font:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:``},vertical_alignment:{type:String,default:``},media_overlay_type:{type:String,default:``,validator:function(e){return[``,`btt`,`ttb`,`ltr`].indexOf(e)!==-1}},media_overlay_light:{type:Boolean,default:!1},media_overlay_midpoint:{type:String,default:``},height:{type:String,default:``},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:``}},setup(e){let n=e,u=ne(),f=t(()=>{let e={};return n.media_overlay_midpoint&&(e[`--banner-overlay-gradient-midpoint`]=n.media_overlay_midpoint),e}),p=t(()=>{let e=[`banner`];return g.addBackgroundClass(e,n),n.buttons.length===1&&e.push(`click-container`),n.height&&e.push(`banner--${n.height}`),n.mobile_content_below_image===!0&&e.push(`banner--stacked`),n.narrow&&e.push(`banner--narrow`),n.horizontal_alignment&&e.push(`banner--horizontal-${n.horizontal_alignment}`),n.vertical_alignment&&e.push(`banner--vertical-${n.vertical_alignment}`),n.media_overlay_light&&e.push(`banner--overlay-light`),u.media&&n.media_overlay_type&&e.push(`banner--overlay-${n.media_overlay_type}`),e}),m=t(()=>{let e=[`headline`,`banner__pre-title`];if(n.headline.size&&e.push(`headline--${n.headline.size}`),n.headline.text_style)switch(n.headline.text_style){case`uppercase`:e.push(`headline--uppercase`);break;case`serif`:e.push(`headline--serif`);break}return e}),h=t(()=>n.buttons.length>1?!1:n.buttons[0].url||!1);return te(()=>{n.buttons.length>0&&y(`.click-container:not([data-uids-no-link])`),document.querySelectorAll(`.media--video`).forEach((e,t)=>{new window.UidsVideo(e,t)})}),(t,n)=>(d(),r(`div`,{class:l(p.value),style:ee(f.value)},[s(t.$slots,`media`),a(`div`,A,[e.pre_title||e.headline.text?(d(),r(`header`,j,[e.pre_title?(d(),r(`div`,{key:0,class:l(m.value)},[a(`span`,{class:`headline__heading`,innerHTML:e.pre_title},null,8,M)],2)):o(``,!0),ae(ce,{level:e.headline.level,text_style:e.headline.text_style,highlight:e.headline.highlight,underline:e.headline.underline,class:l(`headline--${e.headline.size}`)},{default:c(()=>[h.value?(d(),r(`a`,{key:0,href:h.value,class:`click-target`},[a(`span`,{class:`headline__heading`,innerHTML:e.headline.text},null,8,P)],8,N)):(d(),r(`span`,{key:1,class:`headline__heading`,innerHTML:e.headline.text},null,8,F))]),_:1},8,[`level`,`text_style`,`highlight`,`underline`,`class`])])):o(``,!0),t.$slots.default?(d(),r(`div`,I,[s(t.$slots,`default`)])):o(``,!0),e.buttons.length>0||t.$slots.buttons?(d(),r(`footer`,L,[s(t.$slots,`buttons`,{},()=>[e.buttons.length===1?(d(),i(v,{key:0,size:`medium`,color:e.button_color,light_font:e.button_light_font,innerHTML:e.buttons[0].label},null,8,[`color`,`light_font`,`innerHTML`])):e.buttons.length>0?(d(),r(`div`,R,[(d(!0),r(re,null,ie(e.buttons,(t,n)=>(d(),i(se,{url:t.url,size:`medium`,color:e.button_color,light_font:e.button_light_font},{default:c(()=>[a(`span`,{innerHTML:t.label},null,8,z)]),_:2},1032,[`url`,`color`,`light_font`]))),256))])):o(``,!0)])])):o(``,!0)])],6))}})})),H,he=e((()=>{V(),V(),H=B,B.__docgenInfo=Object.assign({displayName:B.name??B.__name},{exportName:`default`,displayName:`Banner`,description:``,tags:{},props:[{name:`headline`,type:{name:`object`},defaultValue:{func:!1,value:`{
  text: '',
  level: 'h2',
  text_style: '',
  size: 'large',
  highlight: false,
  underline: false,
  url: ''
}`}},{name:`pre_title`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`buttons`,type:{name:`array`},defaultValue:{func:!1,value:`[]`}},{name:`button_color`,type:{name:`string`},defaultValue:{func:!1,value:`'primary'`},values:[`primary`,`secondary`,`tertiary`,`transparent`]},{name:`button_light_font`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`horizontal_alignment`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`vertical_alignment`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`media_overlay_type`,type:{name:`string`},defaultValue:{func:!1,value:`''`},values:[`btt`,`ttb`,`ltr`]},{name:`media_overlay_light`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`media_overlay_midpoint`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`height`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`narrow`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`mobile_content_below_image`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`background`,type:{name:`string`},defaultValue:{func:!1,value:`''`}}],slots:[{name:`media`},{name:`default`},{name:`buttons`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/banner/Banner.vue`]})})),U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),he(),b(),x(),w(),T(),m(),de(),pe(),U={title:`Components/Banner`,parameters:{docs:{source:{code:null}}},component:H,tags:[`autodocs`],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:`Pre-title`},content:{name:`Content`},background:{name:`Background`,options:[``,...Object.keys(g.allBackgroundOptions)],control:{type:`select`,labels:{"":`Image or video`,...g.allBackgroundOptions}}},buttons:{name:`Buttons`},button_color:{name:`Button style`,control:{type:`select`},options:[`primary`,`secondary`,`tertiary`,`transparent`],table:{category:`Buttons`}},button_light_font:{name:`Button light font`,control:{type:`boolean`},table:{category:`Buttons`}},horizontal_alignment:{name:`Horizontal alignment`,options:[`left`,`center`],control:{type:`select`,labels:{left:`Left`,center:`Center`}},table:{category:`Display options`}},vertical_alignment:{name:`Vertical alignment`,options:[`top`,`center`,`bottom`],control:{type:`select`,labels:{top:`Top`,center:`Center`,bottom:`Bottom`}},table:{category:`Display options`}},media_overlay_midpoint:{name:`Overlay gradient midpoint`,options:[``,`20%`,`30%`,`40%`,`50%`,`60%`,`70%`],control:{type:`select`,labels:{"":`Default`,"20%":`20%`,"30%":`30%`,"40%":`40% default for bottom to top and top to bottom`,"50%":`50%`,"60%":`60%`,"70%":`70% default for left to right`}},table:{category:`Media`}},media_overlay_type:{name:`Overlay type`,options:[``,`btt`,`ttb`,`ltr`],control:{type:`select`,labels:{"":`No gradient`,btt:`Bottom to top`,ttb:`Top to bottom`,ltr:`Left to right`}},table:{category:`Media`}},media_overlay_light:{name:`Overlay light`,table:{category:`Media`}},height:{name:`Height`,options:[`small`,`medium`,`large`],control:{type:`select`},table:{category:`Display options`}},narrow:{name:`Narrow`,table:{category:`Display options`}},mobile_content_below_image:{name:`Mobile - Display media above content`,control:{type:`boolean`},table:{category:`Media`}},section_background:{...p.argTypes.section_background},grid_type:{name:`Grid`,options:[`onecol`,`onecol__narrow`,`twocol--50-50`,`threecol--33-34-33`,`fourcol--25`],control:{type:`select`,labels:{onecol:`One column`,onecol__narrow:`One column (narrow)`,"twocol--50-50":`Two columns`,"threecol--33-34-33":`Three columns`,"fourcol--25":`Four columns`}},table:{category:`Container`}},record_count:{name:`# of records`,table:{category:`Container`}}}},W={render:e=>({components:{UidsBanner:H,ExampleImage:E,ExampleVideoFile:D},setup(){return{args:e}},template:`
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
            ${e.background_media}
          </template>
          <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
          ${e.content}
        </uids-banner>
      </div>`})},G={...W,args:{background:``,background_media:`<example-image />`,pre_title:`University of Iowa`,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>`,headline:fe.args,horizontal_alignment:`left`,vertical_alignment:`center`,media_overlay_type:``,media_overlay_light:!1,height:`large`,narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:`primary`,media_overlay_midpoint:``,buttons:[{...O.args,label:`Read More `+O.args.icon,color:`primary`}],section_background:``}},G.storyName=`Background image`,K={name:`Background video`,...W,args:{...G.args,background_media:`<example-video-file />`}},q={name:`Background pattern`,...W,args:{...G.args,background:`gold--pattern--particle`,background_media:``}},J={name:`Multiple buttons`,...W,args:{...G.args,buttons:[{...O.args,label:`Apply `+O.args.icon},{...O.args,label:`Learn More `+O.args.icon,url:`https://uiowa.edu/about`},{...O.args,label:`Explore `+O.args.icon,url:`https://uiowa.edu/explore`}]}},Y={...W,args:{...G.args,headline:{...G.args.headline,highlight:!0},content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},X={render:e=>({components:{UidsGrid:S,UidsGridItem:C,UidsBanner:H,ExampleImage:E,ExampleVideoFile:D},setup(){return{args:e}},template:`
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
  `})},Z={name:`Background image grid`,...X,args:{...G.args,headline:{...G.args.headline,size:`medium`},grid_type:`threecol--33-34-33`,record_count:3,height:`medium`}},Q={name:`Background video grid`,...X,args:{...G.args,background_media:`<example-video-file />`,grid_type:`threecol--33-34-33`,record_count:3,height:`medium`,headline_size:`medium`,horizontal_alignment:`left`,vertical_alignment:`bottom`,buttons:J.args.buttons}},$=[`BackgroundImage`,`BackgroundVideo`,`BackgroundPattern`,`MultipleButtons`,`KitchenSink`,`GridImage`,`GridVideo`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Background video',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Background pattern',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      highlight: true
    },
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...Y.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}}}))();export{G as BackgroundImage,q as BackgroundPattern,K as BackgroundVideo,Z as GridImage,Q as GridVideo,Y as KitchenSink,J as MultipleButtons,$ as __namedExportsOrder,U as default};