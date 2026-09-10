import{i as e}from"./preload-helper-fGSbh7xu.js";import t,{t as n}from"./Background.stories-D_5wQVGF.js";import{n as r,t as i}from"./background-D9TKct7-.js";import{n as a,t as o}from"./Banner-BvPHNLMr.js";import{i as s,n as c,r as l,t as u}from"./GridItem-oIrlhf15.js";import{n as d,t as f}from"./ExampleImage-BnGHDy7p.js";import{n as p,t as m}from"./ExampleVideoFile-Bzs8EJKy.js";import{Primary as h,t as g}from"./Button.stories-4poVfoNP.js";import{Default as _,t as v}from"./Headline.stories-DnvZ4k85.js";var y,b,x,S,C,w,T,E,D,O,k;e((()=>{r(),a(),s(),c(),d(),p(),n(),g(),v(),y={title:`Components/Banner`,parameters:{docs:{source:{code:null}}},component:o,tags:[`autodocs`],argTypes:{background_media:{table:{disable:!0}},pre_title:{name:`Pre-title`},content:{name:`Content`},background:{name:`Background`,options:[``,...Object.keys(i.allBackgroundOptions)],control:{type:`select`,labels:{"":`Image or video`,...i.allBackgroundOptions}}},buttons:{name:`Buttons`},button_color:{name:`Button style`,control:{type:`select`},options:[`primary`,`secondary`,`tertiary`,`transparent`],table:{category:`Buttons`}},button_light_font:{name:`Button light font`,control:{type:`boolean`},table:{category:`Buttons`}},horizontal_alignment:{name:`Horizontal alignment`,options:[`left`,`center`],control:{type:`select`,labels:{left:`Left`,center:`Center`}},table:{category:`Display options`}},vertical_alignment:{name:`Vertical alignment`,options:[`top`,`center`,`bottom`],control:{type:`select`,labels:{top:`Top`,center:`Center`,bottom:`Bottom`}},table:{category:`Display options`}},media_overlay_midpoint:{name:`Overlay gradient midpoint`,options:[``,`20%`,`30%`,`40%`,`50%`,`60%`,`70%`],control:{type:`select`,labels:{"":`Default`,"20%":`20%`,"30%":`30%`,"40%":`40% default for bottom to top and top to bottom`,"50%":`50%`,"60%":`60%`,"70%":`70% default for left to right`}},table:{category:`Media`}},media_overlay_type:{name:`Overlay type`,options:[``,`btt`,`ttb`,`ltr`],control:{type:`select`,labels:{"":`No gradient`,btt:`Bottom to top`,ttb:`Top to bottom`,ltr:`Left to right`}},table:{category:`Media`}},media_overlay_light:{name:`Overlay light`,table:{category:`Media`}},height:{name:`Height`,options:[`small`,`medium`,`large`],control:{type:`select`},table:{category:`Display options`}},narrow:{name:`Narrow`,table:{category:`Display options`}},mobile_content_below_image:{name:`Mobile - Display media above content`,control:{type:`boolean`},table:{category:`Media`}},section_background:{...t.argTypes.section_background},grid_type:{name:`Grid`,options:[`onecol`,`onecol__narrow`,`twocol--50-50`,`threecol--33-34-33`,`fourcol--25`],control:{type:`select`,labels:{onecol:`One column`,onecol__narrow:`One column (narrow)`,"twocol--50-50":`Two columns`,"threecol--33-34-33":`Three columns`,"fourcol--25":`Four columns`}},table:{category:`Container`}},record_count:{name:`# of records`,table:{category:`Container`}}}},b={render:e=>({components:{UidsBanner:o,ExampleImage:f,ExampleVideoFile:m},setup(){return{args:e}},template:`
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
      </div>`})},x={...b,args:{background:``,background_media:`<example-image />`,pre_title:`University of Iowa`,content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>`,headline:_.args,horizontal_alignment:`left`,vertical_alignment:`center`,media_overlay_type:``,media_overlay_light:!1,height:`large`,narrow:!0,mobile_content_below_image:!0,button_light_font:!1,button_color:`primary`,media_overlay_midpoint:``,buttons:[{...h.args,label:`Read More `+h.args.icon,color:`primary`}],section_background:``}},x.storyName=`Background image`,S={name:`Background video`,...b,args:{...x.args,background_media:`<example-video-file />`}},C={name:`Background pattern`,...b,args:{...x.args,background:`gold--pattern--particle`,background_media:``}},w={name:`Multiple buttons`,...b,args:{...x.args,buttons:[{...h.args,label:`Apply `+h.args.icon},{...h.args,label:`Learn More `+h.args.icon,url:`https://uiowa.edu/about`},{...h.args,label:`Explore `+h.args.icon,url:`https://uiowa.edu/explore`}]}},T={...b,args:{...x.args,headline:{...x.args.headline,highlight:!0},content:`<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>
<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>
</blockquote><blockquote>
Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.
</blockquote><h2>Heading 2</h2>

<h3><a href="/">Heading 3</a></h3>

<h4>Heading 4</h4>

<h5>Heading 5</h5>

<h6>Heading 6</h6>`}},E={render:e=>({components:{UidsGrid:l,UidsGridItem:u,UidsBanner:o,ExampleImage:f,ExampleVideoFile:m},setup(){return{args:e}},template:`
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
  `})},D={name:`Background image grid`,...E,args:{...x.args,headline:{...x.args.headline,size:`medium`},grid_type:`threecol--33-34-33`,record_count:3,height:`medium`}},O={name:`Background video grid`,...E,args:{...x.args,background_media:`<example-video-file />`,grid_type:`threecol--33-34-33`,record_count:3,height:`medium`,headline_size:`medium`,horizontal_alignment:`left`,vertical_alignment:`bottom`,buttons:w.args.buttons}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Background video',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background_media: \`<example-video-file />\`
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Background pattern',
  ...Template,
  args: {
    ...BackgroundImage.args,
    background: 'gold--pattern--particle',
    background_media: ''
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...BackgroundImage.args,
    headline: {
      ...BackgroundImage.args.headline,
      highlight: true
    },
    content: '<p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p><blockquote>\\n' + '<p>Nam at tortor in tellus interdum sagittis. Morbi vestibulum volutpat enim.</p>\\n' + '</blockquote><blockquote>\\n' + 'Nam at tortor in <a href="/">tellus</a> interdum sagittis. Morbi vestibulum volutpat enim.\\n' + '</blockquote><h2>Heading 2</h2>\\n' + '\\n' + '<h3><a href="/">Heading 3</a></h3>\\n' + '\\n' + '<h4>Heading 4</h4>\\n' + '\\n' + '<h5>Heading 5</h5>\\n' + '\\n' + '<h6>Heading 6</h6>'
  }
}`,...T.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k=[`BackgroundImage`,`BackgroundVideo`,`BackgroundPattern`,`MultipleButtons`,`KitchenSink`,`GridImage`,`GridVideo`]}))();export{x as BackgroundImage,C as BackgroundPattern,S as BackgroundVideo,D as GridImage,O as GridVideo,T as KitchenSink,w as MultipleButtons,k as __namedExportsOrder,y as default};