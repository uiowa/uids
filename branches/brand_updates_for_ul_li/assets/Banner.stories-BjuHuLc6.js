import{d as X,s as ee,k,v as te,c as l,l as c,f as $,n as B,m as u,a as ae,b as M,o as r,p as P,F as ne,x as ie}from"./vue.esm-bundler--ETYdinE.js";import{_ as oe}from"./Button.vue_vue_type_script_setup_true_lang-DZHdLx2E.js";import{_ as re}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as se,_ as le}from"./click-a11y-BPbdm7Kw.js";import{B as w}from"./background-DvwhyV5E.js";/* empty css                    */import{_ as de,a as ce}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as Z,a as J}from"./ExampleVideoFile-DZeII_Fv.js";import{Primary as i}from"./Button.stories-CunxMXqt.js";import ge from"./Background.stories-GBMZQSoa.js";import"./utlity-CAV5GFHh.js";/* empty css               */import"./Stub.vue_vue_type_script_setup_true_lang-BouT5YQp.js";(function(){const a=matchMedia("(prefers-reduced-motion)");function e(n,s){if(n&&(this.element=n,this.video=this.element.querySelector("video"),this.video)){this.video.id=this.video.id+"-"+s,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+s,e.reducedMotionCheck(this.video,this.video_btn),a.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)});const d=this;this.video_btn.addEventListener("click",function(){e.pausePlay(d.video,d.video_btn)}),this.video.addEventListener("pause",function(){e.setButtonDataPlay(d.video_btn)}),this.video.addEventListener("play",function(){e.setButtonDataPaused(d.video_btn)}),this.video.paused?e.setButtonDataPlay(this.video_btn):e.setButtonDataPaused(this.video_btn)}}e.reducedMotionCheck=function(n,s){a.matches&&(n.pause(),this.setButtonDataPlay(s))},e.pausePlay=function(n,s){n.paused?(n.play(),e.setButtonDataPaused(s)):(n.pause(),e.setButtonDataPlay(s))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const y=document.getElementsByClassName("media--video");for(let n=0;n<y.length;n++)new UidsVideo(y[n],n)})();const me={class:"banner__content"},ue={key:0,class:"banner__title"},he=["href"],_e={key:1,class:"banner__text"},pe={key:2,class:"banner__action"},be={key:1,class:"bttn--row"},ye=["innerHTML"],z=X({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(a){return["primary","secondary","tertiary","transparent"].indexOf(a)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(a){return["","btt","ttb","ltr"].indexOf(a)!==-1}},media_overlay_light:{type:Boolean,default:!1},height:{type:String,default:""},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(a){const e=a,y=ee(),n=k(()=>{let t=["banner"];return w.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.height&&t.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.narrow&&t.push("banner--narrow"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),e.media_overlay_light&&t.push("banner--overlay-light"),y.media&&e.media_overlay_type&&t.push(`banner--overlay-${e.media_overlay_type}`),t}),s=k(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),d=k(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return te(()=>{e.buttons.length>0&&se(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((S,f)=>{new window.UidsVideo(S,f)})}),(t,S)=>(r(),l("div",{class:B(n.value)},[c(t.$slots,"media"),$("div",me,[t.$slots.title||t.$slots.pre_title?(r(),l("header",ue,[t.$slots.pre_title?(r(),l("div",{key:0,class:B(s.value)},[c(t.$slots,"pre_title")],2)):u("",!0),ae(re,{text_style:a.headline_style,highlight:a.headline_highlight,class:B(`headline--${e.headline_size}`)},{default:M(()=>[d.value?(r(),l("a",{key:0,href:d.value,class:"click-target"},[c(t.$slots,"title")],8,he)):c(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):u("",!0),t.$slots.default?(r(),l("div",_e,[c(t.$slots,"default")])):u("",!0),a.buttons.length>0||t.$slots.buttons?(r(),l("footer",pe,[c(t.$slots,"buttons",{},()=>[a.buttons.length===1?(r(),P(le,{key:0,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:a.buttons[0].label},null,8,["color","light_font","innerHTML"])):a.buttons.length>0?(r(),l("div",be,[(r(!0),l(ne,null,ie(a.buttons,(f,fe)=>(r(),P(oe,{url:f.url,size:"medium",color:a.button_color,light_font:a.button_light_font},{default:M(()=>[$("span",{innerHTML:f.label},null,8,ye)]),_:2},1032,["url","color","light_font"]))),256))])):u("",!0)])])):u("",!0)])],2))}}),Ae={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:z,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(w.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...w.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},narrow:{name:"Narrow",table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{...ge.argTypes.section_background},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},b={render:a=>({components:{UidsBanner:z,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:a}},template:`
      <div class="column-container" :class="args.section_background" style="padding-top: 2rem; padding-bottom: 2rem;">
        <uids-banner
          :background="args.background"
          :headline_style="args.headline_style"
          :headline_size="args.headline_size"
          :headline_highlight="args.headline_highlight"
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
            ${a.background_media}
          </template>
          <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
          <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
          ${a.content}
        </uids-banner>
      </div>`})},o={...b,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Your path to success starts here",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"left",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...i.args,label:"Read More "+i.args.icon,color:"primary"}],section_background:""}};o.storyName="Background image";const h={...b,args:{...o.args,background_media:"<example-video-file />"}};h.storyName="Background video";const _={...b,args:{...o.args,background:"gold--pattern--particle",background_media:""}};_.storyName="Background pattern";const p={...b,args:{...o.args,buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]}};p.storyName="Multiple buttons";const v={...b,args:{...o.args,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},W=a=>({components:{UidsGrid:de,UidsGridItem:ce,UidsBanner:z,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:a}},template:`
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
            :narrow="args.narrow"
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
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),g=W.bind({});g.args={...o.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};g.storyName="Background image grid";const m=W.bind({});m.args={...o.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]};m.storyName="Background video grid";var T,H,I;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...Template,
  args: {
    background: '',
    background_media: \`<example-image />\`,
    pre_title: 'University of Iowa',
    title: 'Your path to success starts here',
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',
    headline_style: 'serif',
    headline_highlight: false,
    headline_size: 'large',
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
}`,...(I=(H=o.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var U,A,C;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(C=(A=h.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var L,E,x;_.parameters={..._.parameters,docs:{...(L=_.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(x=(E=_.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var N,V,D;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(D=(V=p.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var G,q,O;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(O=(q=v.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var F,K,R;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
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
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(R=(K=g.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var Y,j,Q;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`args => ({
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
            <template #pre_title v-if="args.title"><span class="headline__heading" v-html="args.pre_title" ></span></template>
            <template #title v-if="args.title"><span class="headline__heading" v-html="args.title" ></span></template>
            \${args.content}
          </uids-banner>
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...(Q=(j=m.parameters)==null?void 0:j.docs)==null?void 0:Q.source}}};const Ce=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{o as BackgroundImage,_ as BackgroundPattern,h as BackgroundVideo,g as GridImage,m as GridVideo,v as KitchenSink,p as MultipleButtons,Ce as __namedExportsOrder,Ae as default};
