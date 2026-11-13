import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./_media-CpQ5Q5v3.js";import{n as t,t as n}from"./ExampleImage-R0Y1JRA2.js";import{n as r,t as i}from"./ExampleVideoFile-C5lBWjah.js";import{n as a}from"./Media-BPxaHD1_.js";var o,s,c,l,u,d;function f(){return(f=e((()=>{a(),t(),r(),o={components:{ExampleImage:n,ExampleVideoFile:i},title:`Components/Media`,tags:[`!autodocs`,`!dev`],parameters:{docs:{source:{code:null}},options:{showPanel:!1}}},s={render:e=>({components:{ExampleImage:n},setup(){return{args:e}},template:`
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    `}),args:{src:`https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-`,height:432,width:768}},c={render:()=>({template:`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    `})},l={render:()=>({template:`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    `})},u={render:()=>({template:`
      <example-video-file />
    `})},d=[`Image`,`EmbedVideo`,`VerticalVideo`,`HorizontalVideo`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    \`
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    \`
  })
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <example-video-file />
    \`
  })
}`,...u.parameters?.docs?.source}}}})))()}f();export{c as EmbedVideo,u as HorizontalVideo,s as Image,l as VerticalVideo,d as __namedExportsOrder,o as default};