import"./iframe-V1fGY6lD.js";/* empty css               */import{_ as w,a as f}from"./ExampleVideoFile-DUXTQ9su.js";import"./preload-helper-C75N-_n-.js";const y={components:{ExampleImage:w,ExampleVideoFile:f},title:"Components/Media",tags:["!autodocs","!dev"],parameters:{docs:{source:{code:null}},options:{showPanel:!1}}},e={render:b=>({components:{ExampleImage:w},setup(){return{args:b}},template:`
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    `}),args:{src:"https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-",height:432,width:768}},a={render:()=>({template:`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    `})},t={render:()=>({template:`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    `})},s={render:()=>({template:`
      <example-video-file />
    `})};var r,o,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var n,d,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    \`
  })
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,c,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    \`
  })
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,h,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <example-video-file />
    \`
  })
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const T=["Image","EmbedVideo","VerticalVideo","HorizontalVideo"];export{a as EmbedVideo,s as HorizontalVideo,e as Image,t as VerticalVideo,T as __namedExportsOrder,y as default};
