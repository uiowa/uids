import{d as X,s as ee,k as v,v as te,c as l,l as d,f as $,n as k,m,a as ae,b as M,o as r,p as T,F as ne,x as ie}from"./vue.esm-bundler--ETYdinE.js";import{_ as oe}from"./Button.vue_vue_type_script_setup_true_lang-DZHdLx2E.js";import{_ as re}from"./Headline.vue_vue_type_script_setup_true_lang-Bzaie0v3.js";import{a as se,_ as le}from"./click-a11y-BPbdm7Kw.js";import{B}from"./background-DvwhyV5E.js";/* empty css                    */import{_ as de,a as ge}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import{_ as Z,a as J}from"./ExampleVideoFile-DZeII_Fv.js";import{Primary as i}from"./Button.stories-CunxMXqt.js";import ce from"./Background.stories-BNx0DSfw.js";import"./utlity-CAV5GFHh.js";/* empty css               */import"./Stub.vue_vue_type_script_setup_true_lang-BouT5YQp.js";(function(){const a=matchMedia("(prefers-reduced-motion)");function e(n,s){n&&(this.element=n,this.video=this.element.querySelector("video"),this.video&&(this.video.id=this.video.id+"-"+s,this.video_btn=this.element.querySelector(".video-controls .video-btn"),this.video_btn.id=this.video_btn.id+"-"+s,e.reducedMotionCheck(this.video,this.video_btn),a.addListener(function(){e.reducedMotionCheck(this.video,this.video_btn)}),this.video_btn.addEventListener("click",()=>{e.pausePlay(this.video,this.video_btn)})))}e.reducedMotionCheck=function(n,s){a.matches&&(n.pause(),this.setButtonDataPlay(s))},e.pausePlay=function(n,s){n.paused?(n.play(),e.setButtonDataPaused(s)):(n.pause(),e.setButtonDataPlay(s))},e.setButtonDataPaused=function(n){n.innerHTML="<span class='element-invisible'>Pause</span>",n.classList.remove("video-btn__play"),n.classList.add("video-btn__pause"),n.setAttribute("aria-label","Pause")},e.setButtonDataPlay=function(n){n.innerHTML="<span class='element-invisible'>Play</span>",n.classList.remove("video-btn__pause"),n.classList.add("video-btn__play"),n.setAttribute("aria-label","Play")},window.UidsVideo=e;const b=document.getElementsByClassName("media--video");for(let n=0;n<b.length;n++)new UidsVideo(b[n],n)})();const me={class:"banner__content"},ue={key:0,class:"banner__title"},he=["href"],_e={key:1,class:"banner__text"},pe={key:2,class:"banner__action"},be={key:1,class:"bttn--row"},ye=["innerHTML"],w=X({__name:"Banner",props:{buttons:{type:Array,default:()=>[]},button_color:{type:String,default:"primary",validator:function(a){return["primary","secondary","tertiary","transparent"].indexOf(a)!==-1}},button_light_font:{type:Boolean,default:!1},headline_size:{type:String,default:""},headline_style:{type:String,default:""},headline_highlight:{type:Boolean,default:!1},horizontal_alignment:{type:String,default:""},vertical_alignment:{type:String,default:""},media_overlay_type:{type:String,default:"",validator:function(a){return["","btt","ttb","ltr"].indexOf(a)!==-1}},media_overlay_light:{type:Boolean,default:!1},height:{type:String,default:""},narrow:{type:Boolean,default:!1},mobile_content_below_image:{type:Boolean,default:!1},background:{type:String,default:""}},setup(a){const e=a,b=ee(),n=v(()=>{let t=["banner"];return B.addBackgroundClass(t,e),e.buttons.length===1&&t.push("click-container"),e.height&&t.push(`banner--${e.height}`),e.mobile_content_below_image===!0&&t.push("banner--stacked"),e.narrow&&t.push("banner--narrow"),e.horizontal_alignment&&t.push(`banner--horizontal-${e.horizontal_alignment}`),e.vertical_alignment&&t.push(`banner--vertical-${e.vertical_alignment}`),b.media&&(e.media_overlay_type&&t.push(`banner--overlay-${e.media_overlay_type}`),e.media_overlay_light&&t.push("banner--overlay-light")),t}),s=v(()=>{const t=["headline","banner__pre-title"];if(e.headline_size&&t.push(`headline--${e.headline_size}`),e.headline_style)switch(e.headline_style){case"uppercase":t.push("headline--uppercase");break;case"serif":t.push("headline--serif");break}return t}),z=v(()=>e.buttons.length>1?!1:e.buttons[0].url||!1);return te(()=>{e.buttons.length>0&&se(".click-container:not([data-uids-no-link])"),document.querySelectorAll(".media--video").forEach((S,y)=>{new window.UidsVideo(S,y)})}),(t,S)=>(r(),l("div",{class:k(n.value)},[d(t.$slots,"media"),$("div",me,[t.$slots.title||t.$slots.pre_title?(r(),l("header",ue,[t.$slots.pre_title?(r(),l("div",{key:0,class:k(s.value)},[d(t.$slots,"pre_title")],2)):m("",!0),ae(re,{text_style:a.headline_style,highlight:a.headline_highlight,class:k(`headline--${e.headline_size}`)},{default:M(()=>[z.value?(r(),l("a",{key:0,href:z.value,class:"click-target"},[d(t.$slots,"title")],8,he)):d(t.$slots,"title",{key:1})]),_:3},8,["text_style","highlight","class"])])):m("",!0),t.$slots.default?(r(),l("div",_e,[d(t.$slots,"default")])):m("",!0),a.buttons.length>0||t.$slots.buttons?(r(),l("footer",pe,[d(t.$slots,"buttons",{},()=>[a.buttons.length===1?(r(),T(le,{key:0,size:"medium",color:a.button_color,light_font:a.button_light_font,innerHTML:a.buttons[0].label},null,8,["color","light_font","innerHTML"])):a.buttons.length>0?(r(),l("div",be,[(r(!0),l(ne,null,ie(a.buttons,(y,fe)=>(r(),T(oe,{url:y.url,size:"medium",color:a.button_color,light_font:a.button_light_font},{default:M(()=>[$("span",{innerHTML:y.label},null,8,ye)]),_:2},1032,["url","color","light_font"]))),256))])):m("",!0)])])):m("",!0)])],2))}}),Ae={title:"Components/Banner",parameters:{docs:{source:{code:null}}},component:w,tags:["autodocs"],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:"Pre-title"},title:{name:"Title"},content:{name:"Content"},background:{name:"Background",options:["",...Object.keys(B.allBackgroundOptions)],control:{type:"select",labels:{"":"Image or video",...B.allBackgroundOptions}}},buttons:{name:"Buttons"},button_color:{name:"Button style",control:{type:"select"},options:["primary","secondary","tertiary","transparent"],table:{category:"Buttons"}},button_light_font:{name:"Button light font",control:{type:"boolean"},table:{category:"Buttons"}},headline_size:{name:"Headline size",options:["large","medium","small"],control:{type:"select"},table:{category:"Headline"}},headline_style:{name:"Headline style",options:["uppercase","serif"],control:{type:"select",labels:{uppercase:"Antonio",serif:"Zilla Slab"}},table:{category:"Headline"}},headline_highlight:{name:"Headline highlight",table:{category:"Headline"}},horizontal_alignment:{name:"Horizontal alignment",options:["left","center"],control:{type:"select",labels:{left:"Left",center:"Center"}},table:{category:"Display options"}},vertical_alignment:{name:"Vertical alignment",options:["top","center","bottom"],control:{type:"select",labels:{top:"Top",center:"Center",bottom:"Bottom"}},table:{category:"Display options"}},media_overlay_type:{name:"Overlay type",options:["","btt","ttb","ltr"],control:{type:"select",labels:{"":"No gradient",btt:"Bottom to top",ttb:"Top to bottom",ltr:"Left to right"}},table:{category:"Media"}},media_overlay_light:{name:"Overlay light",table:{category:"Media"}},height:{name:"Height",options:["small","medium","large"],control:{type:"select"},table:{category:"Display options"}},narrow:{name:"Narrow",table:{category:"Display options"}},mobile_content_below_image:{name:"Mobile - Display media above content",control:{type:"boolean"},table:{category:"Media"}},section_background:{...ce.argTypes.section_background},grid_type:{name:"Grid",options:["onecol","onecol__narrow","twocol--50-50","threecol--33-34-33","fourcol--25"],control:{type:"select",labels:{onecol:"One column",onecol__narrow:"One column (narrow)","twocol--50-50":"Two columns","threecol--33-34-33":"Three columns","fourcol--25":"Four columns"}},table:{category:"Container"}},record_count:{name:"# of records",table:{category:"Container"}}}},p={render:a=>({components:{UidsBanner:w,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:a}},template:`
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
      </div>`})},o={...p,args:{background:"",background_media:"<example-image />",pre_title:"University of Iowa",title:"Your path to success starts here",content:'<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>',headline_style:"serif",headline_highlight:!1,headline_size:"large",horizontal_alignment:"left",vertical_alignment:"center",media_overlay_type:"",media_overlay_light:!1,height:"large",narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:"primary",buttons:[{...i.args,label:"Read More "+i.args.icon,color:"primary"}],section_background:""}};o.storyName="Background image";const u={...p,args:{...o.args,background_media:"<example-video-file />"}};u.storyName="Background video";const h={...p,args:{...o.args,background:"gold--pattern--particle",background_media:""}};h.storyName="Background pattern";const _={...p,args:{...o.args,buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]}};_.storyName="Multiple buttons";const f={...p,args:{...o.args,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3>Heading 3</h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},W=a=>({components:{UidsGrid:de,UidsGridItem:ge,UidsBanner:w,ExampleImage:Z,ExampleVideoFile:J},setup(){return{args:a}},template:`
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
  `}),g=W.bind({});g.args={...o.args,grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium"};g.storyName="Background image grid";const c=W.bind({});c.args={...o.args,background_media:"<example-video-file />",grid_type:"threecol--33-34-33",record_count:3,height:"medium",headline_size:"medium",horizontal_alignment:"left",vertical_alignment:"bottom",buttons:[{...i.args,label:"Apply "+i.args.icon},{...i.args,label:"Learn More "+i.args.icon,url:"https://uiowa.edu/about"},{...i.args,label:"Explore "+i.args.icon,url:"https://uiowa.edu/explore"}]};c.storyName="Background video grid";var H,P,U;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(U=(P=o.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var I,A,C;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...(C=(A=u.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var L,x,E;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...(E=(x=h.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var N,V,G;_.parameters={..._.parameters,docs:{...(N=_.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(G=(V=_.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var q,D,O;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3>Heading 3</h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...(O=(D=f.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var F,K,R;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
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
})`,...(R=(K=g.parameters)==null?void 0:K.docs)==null?void 0:R.source}}};var Y,j,Q;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`args => ({
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
})`,...(Q=(j=c.parameters)==null?void 0:j.docs)==null?void 0:Q.source}}};const Ce=["BackgroundImage","BackgroundVideo","BackgroundPattern","MultipleButtons","KitchenSink","GridImage","GridVideo"];export{o as BackgroundImage,h as BackgroundPattern,u as BackgroundVideo,g as GridImage,c as GridVideo,f as KitchenSink,_ as MultipleButtons,Ce as __namedExportsOrder,Ae as default};
