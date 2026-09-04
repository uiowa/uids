import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_media-CQNCG522.js";import{i as n,n as r,r as i,t as a}from"./ExampleVideoFile-CDIcHN4p.js";import{n as o}from"./Media-CBsCzRRV.js";var s,c,l,u,d,f;e((()=>{o(),t(),n(),r(),s={components:{ExampleImage:i,ExampleVideoFile:a},title:`Components/Media`,tags:[`!autodocs`,`!dev`],parameters:{docs:{source:{code:null}},options:{showPanel:!1}}},c={render:e=>({components:{ExampleImage:i},setup(){return{args:e}},template:`
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    `}),args:{src:`https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-`,height:432,width:768}},l={render:()=>({template:`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    `})},u={render:()=>({template:`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    `})},d={render:()=>({template:`
      <example-video-file />
    `})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ExampleImage
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    \`
  }),
  args: {
    src: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-',
    height: 432,
    width: 768
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <example-video-file />
    \`
  })
}`,...d.parameters?.docs?.source}}},f=[`Image`,`EmbedVideo`,`VerticalVideo`,`HorizontalVideo`]}))();export{l as EmbedVideo,d as HorizontalVideo,c as Image,u as VerticalVideo,f as __namedExportsOrder,s as default};