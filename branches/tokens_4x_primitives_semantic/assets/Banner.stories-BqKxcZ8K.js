import{i as e}from"./preload-helper-fGSbh7xu.js";import{$ as t,Q as n,X as r,Z as ee,at as te,bt as i,dt as a,et as o,ft as s,gt as c,ht as l,lt as ne,nt as u,ot as d,tt as f,ut as p,xt as re}from"./iframe-C5wjscsB.js";import{t as m}from"./_background-BMQi4Pne.js";import h,{t as g}from"./Background.stories-D3pRBre6.js";import{n as _,t as v}from"./background-D9TKct7-.js";import{n as y,t as b}from"./Button-3gXrlHoS.js";import{n as x,t as S}from"./Headline-BBSF93By.js";import{i as C,n as w,r as T,t as ie}from"./click-a11y-BubL_Wg9.js";import{i as ae,n as oe,r as se,t as ce}from"./GridItem-CRj-D8jf.js";import{i as le,n as E,r as D,t as O}from"./ExampleVideoFile-EXXB0flx.js";import{Primary as k,t as ue}from"./Button.stories-CHroqrIN.js";import{Default as de,t as fe}from"./Headline.stories-zNBU8fnK.js";var pe=e((()=>{})),me=e((()=>{(function(){let e=matchMedia(`(prefers-reduced-motion)`);function t(n,r){if(n&&(this.element=n,this.video=this.element.querySelector(`.banner video`),this.video)){this.video.id=this.video.id+`-`+r,this.video_btn=this.element.querySelector(`.video-controls .video-btn`),this.video_btn.id=this.video_btn.id+`-`+r,t.reducedMotionCheck(this.video,this.video_btn),e.addListener(function(){t.reducedMotionCheck(this.video,this.video_btn)});let n=this;this.video_btn.addEventListener(`click`,function(){t.pausePlay(n.video,n.video_btn)}),this.video.addEventListener(`pause`,function(){t.setButtonDataPlay(n.video_btn)}),this.video.addEventListener(`play`,function(){t.setButtonDataPaused(n.video_btn)}),this.video.paused?t.setButtonDataPlay(this.video_btn):t.setButtonDataPaused(this.video_btn)}}t.reducedMotionCheck=function(t,n){e.matches&&(t.pause(),this.setButtonDataPlay(n))},t.pausePlay=function(e,n){e.paused?(e.play(),t.setButtonDataPaused(n)):(e.pause(),t.setButtonDataPlay(n))},t.setButtonDataPaused=function(e){e.innerHTML=`<span class='element-invisible'>Pause</span>`,e.classList.remove(`video-btn__play`),e.classList.add(`video-btn__pause`),e.setAttribute(`aria-label`,`Pause`)},t.setButtonDataPlay=function(e){e.innerHTML=`<span class='element-invisible'>Play</span>`,e.classList.remove(`video-btn__pause`),e.classList.add(`video-btn__play`),e.setAttribute(`aria-label`,`Play`)},window.UidsVideo=t;let n=document.getElementsByClassName(`media--video`);for(let e=0;e<n.length;e++)new UidsVideo(n[e],e)})()})),A,j,M,N,P,F,I,L,R,z,B,V=e((()=>{r(),y(),x(),C(),_(),pe(),m(),me(),w(),A={class:`banner__content`},j={key:0,class:`banner__title`},M=[`innerHTML`],N=[`href`],P=[`innerHTML`],F=[`innerHTML`],I={key:1,class:`banner__text`},L={key:2,class:`banner__action`},R={key:1,class:`bttn--row`},z=[`innerHTML`],B=d({__name:`Banner`,props:{headline:{type:Object,default:()=>({text:``,level:`h2`,text_style:``,size:`large`,highlight:!1,underline:!1,url:``})},pre_title:{type:String,default:``},buttons:{type:Array,default:()=>[]},button_color:{type:String,default:`primary`,validator:function(e){return[`primary`,`secondary`,`tertiary`,`transparent`].indexOf(e)!==-1}},button_light_font:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:``},vertical_alignment:{type:String,default:``},media_overlay_type:{type:String,default:``,validator:function(e){return[``,`btt`,`ttb`,`ltr`].indexOf(e)!==-1}},media_overlay_light:{type:Boolean,default:!1},media_overlay_midpoint:{type:String,default:``},height:{type:String,default:``},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:``}},setup(e){let r=e,d=l(),m=n(()=>{let e={};return r.media_overlay_midpoint&&(e[`--banner-overlay-gradient-midpoint`]=r.media_overlay_midpoint),e}),h=n(()=>{let e=[`banner`];return v.addBackgroundClass(e,r),r.buttons.length===1&&e.push(`click-container`),r.height&&e.push(`banner--${r.height}`),r.mobile_content_below_image===!0&&e.push(`banner--stacked`),r.narrow&&e.push(`banner--narrow`),r.horizontal_alignment&&e.push(`banner--horizontal-${r.horizontal_alignment}`),r.vertical_alignment&&e.push(`banner--vertical-${r.vertical_alignment}`),r.media_overlay_light&&e.push(`banner--overlay-light`),d.media&&r.media_overlay_type&&e.push(`banner--overlay-${r.media_overlay_type}`),e}),g=n(()=>{let e=[`headline`,`banner__pre-title`];if(r.headline.size&&e.push(`headline--${r.headline.size}`),r.headline.text_style)switch(r.headline.text_style){case`uppercase`:e.push(`headline--uppercase`);break;case`serif`:e.push(`headline--serif`);break}return e}),_=n(()=>r.buttons.length>1?!1:r.buttons[0].url||!1);return ne(()=>{r.buttons.length>0&&ie(`.click-container:not([data-uids-no-link])`),document.querySelectorAll(`.media--video`).forEach((e,t)=>{new window.UidsVideo(e,t)})}),(n,r)=>(p(),u(`div`,{class:i(h.value),style:re(m.value)},[s(n.$slots,`media`),t(`div`,A,[e.pre_title||e.headline.text?(p(),u(`header`,j,[e.pre_title?(p(),u(`div`,{key:0,class:i(g.value)},[t(`span`,{class:`headline__heading`,innerHTML:e.pre_title},null,8,M)],2)):f(``,!0),te(S,{level:e.headline.level,text_style:e.headline.text_style,highlight:e.headline.highlight,underline:e.headline.underline,class:i(`headline--${e.headline.size}`)},{default:c(()=>[_.value?(p(),u(`a`,{key:0,href:_.value,class:`click-target`},[t(`span`,{class:`headline__heading`,innerHTML:e.headline.text},null,8,P)],8,N)):(p(),u(`span`,{key:1,class:`headline__heading`,innerHTML:e.headline.text},null,8,F))]),_:1},8,[`level`,`text_style`,`highlight`,`underline`,`class`])])):f(``,!0),n.$slots.default?(p(),u(`div`,I,[s(n.$slots,`default`)])):f(``,!0),e.buttons.length>0||n.$slots.buttons?(p(),u(`footer`,L,[s(n.$slots,`buttons`,{},()=>[e.buttons.length===1?(p(),o(T,{key:0,size:`medium`,color:e.button_color,light_font:e.button_light_font,innerHTML:e.buttons[0].label},null,8,[`color`,`light_font`,`innerHTML`])):e.buttons.length>0?(p(),u(`div`,R,[(p(!0),u(ee,null,a(e.buttons,(n,r)=>(p(),o(b,{url:n.url,size:`medium`,color:e.button_color,light_font:e.button_light_font},{default:c(()=>[t(`span`,{innerHTML:n.label},null,8,z)]),_:2},1032,[`url`,`color`,`light_font`]))),256))])):f(``,!0)])])):f(``,!0)])],6))}})})),H,he=e((()=>{V(),V(),H=B})),U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{_(),he(),ae(),oe(),le(),E(),g(),ue(),fe(),U={title:`Components/Banner`,parameters:{docs:{source:{code:null}}},component:H,tags:[`autodocs`],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:`Pre-title`},content:{name:`Content`},background:{name:`Background`,options:[``,...Object.keys(v.allBackgroundOptions)],control:{type:`select`,labels:{"":`Image or video`,...v.allBackgroundOptions}}},buttons:{name:`Buttons`},button_color:{name:`Button style`,control:{type:`select`},options:[`primary`,`secondary`,`tertiary`,`transparent`],table:{category:`Buttons`}},button_light_font:{name:`Button light font`,control:{type:`boolean`},table:{category:`Buttons`}},horizontal_alignment:{name:`Horizontal alignment`,options:[`left`,`center`],control:{type:`select`,labels:{left:`Left`,center:`Center`}},table:{category:`Display options`}},vertical_alignment:{name:`Vertical alignment`,options:[`top`,`center`,`bottom`],control:{type:`select`,labels:{top:`Top`,center:`Center`,bottom:`Bottom`}},table:{category:`Display options`}},media_overlay_midpoint:{name:`Overlay gradient midpoint`,options:[``,`20%`,`30%`,`40%`,`50%`,`60%`,`70%`],control:{type:`select`,labels:{"":`Default`,"20%":`20%`,"30%":`30%`,"40%":`40% default for bottom to top and top to bottom`,"50%":`50%`,"60%":`60%`,"70%":`70% default for left to right`}},table:{category:`Media`}},media_overlay_type:{name:`Overlay type`,options:[``,`btt`,`ttb`,`ltr`],control:{type:`select`,labels:{"":`No gradient`,btt:`Bottom to top`,ttb:`Top to bottom`,ltr:`Left to right`}},table:{category:`Media`}},media_overlay_light:{name:`Overlay light`,table:{category:`Media`}},height:{name:`Height`,options:[`small`,`medium`,`large`],control:{type:`select`},table:{category:`Display options`}},narrow:{name:`Narrow`,table:{category:`Display options`}},mobile_content_below_image:{name:`Mobile - Display media above content`,control:{type:`boolean`},table:{category:`Media`}},section_background:{...h.argTypes.section_background},grid_type:{name:`Grid`,options:[`onecol`,`onecol__narrow`,`twocol--50-50`,`threecol--33-34-33`,`fourcol--25`],control:{type:`select`,labels:{onecol:`One column`,onecol__narrow:`One column (narrow)`,"twocol--50-50":`Two columns`,"threecol--33-34-33":`Three columns`,"fourcol--25":`Four columns`}},table:{category:`Container`}},record_count:{name:`# of records`,table:{category:`Container`}}}},W={render:e=>({components:{UidsBanner:H,ExampleImage:D,ExampleVideoFile:O},setup(){return{args:e}},template:`
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
      </div>`})},G={...W,args:{background:``,background_media:`<example-image />`,pre_title:`University of Iowa`,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>`,headline:de.args,horizontal_alignment:`left`,vertical_alignment:`center`,media_overlay_type:``,media_overlay_light:!1,height:`large`,narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:`primary`,media_overlay_midpoint:``,buttons:[{...k.args,label:`Read More `+k.args.icon,color:`primary`}],section_background:``}},G.storyName=`Background image`,K={name:`Background video`,...W,args:{...G.args,background_media:`<example-video-file />`}},q={name:`Background pattern`,...W,args:{...G.args,background:`gold--pattern--particle`,background_media:``}},J={name:`Multiple buttons`,...W,args:{...G.args,buttons:[{...k.args,label:`Apply `+k.args.icon},{...k.args,label:`Learn More `+k.args.icon,url:`https://uiowa.edu/about`},{...k.args,label:`Explore `+k.args.icon,url:`https://uiowa.edu/explore`}]}},Y={...W,args:{...G.args,headline:{...G.args.headline,highlight:!0},content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},X={render:e=>({components:{UidsGrid:se,UidsGridItem:ce,UidsBanner:H,ExampleImage:D,ExampleVideoFile:O},setup(){return{args:e}},template:`
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
  `})},Z={name:`Background image grid`,...X,args:{...G.args,headline:{...G.args.headline,size:`medium`},grid_type:`threecol--33-34-33`,record_count:3,height:`medium`}},Q={name:`Background video grid`,...X,args:{...G.args,background_media:`<example-video-file />`,grid_type:`threecol--33-34-33`,record_count:3,height:`medium`,headline_size:`medium`,horizontal_alignment:`left`,vertical_alignment:`bottom`,buttons:J.args.buttons}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}},$=[`BackgroundImage`,`BackgroundVideo`,`BackgroundPattern`,`MultipleButtons`,`KitchenSink`,`GridImage`,`GridVideo`]}))();export{G as BackgroundImage,q as BackgroundPattern,K as BackgroundVideo,Z as GridImage,Q as GridVideo,Y as KitchenSink,J as MultipleButtons,$ as __namedExportsOrder,U as default};