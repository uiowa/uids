import"./vue.esm-bundler--ETYdinE.js";/* empty css               */import{_ as v}from"./ExampleImage-BEq2icwx.js";const y={components:{ExampleImage:v},title:"Components/Media",tags:["!autodocs","!dev"],parameters:{docs:{source:{code:null}},options:{showPanel:!1}}},e={render:g=>({components:{ExampleImage:v},setup(){return{args:g}},template:`
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    `}),args:{src:"https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-",height:432,width:768}},a={render:()=>({template:`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    `})},o={render:()=>({template:`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    `})},s={render:()=>({template:`
      <video loop="loop" muted="muted" width="1300" height="730" poster="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png" playsinline="playsinline" autoplay="autoplay" id="video-container-0">
        <source src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4" type="video/mp4">
      </video>

      <div class="video-controls video">
        <button class="video-btn video-btn__pause" id="video-btn-pause" v-if="enable_autoplay">
          <span class="element-invisible">Pause</span>
        </button>
        <button class="video-btn video-btn__play" id="video-btn-play" v-else>
          <span class="element-invisible">Play</span>
        </button>
      </div>
    </div>
    `})};var t,i,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var r,d,p;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    \`
  })
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,u,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    \`
  })
}`,...(c=(u=o.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var m,b,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <video loop="loop" muted="muted" width="1300" height="730" poster="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png" playsinline="playsinline" autoplay="autoplay" id="video-container-0">
        <source src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4" type="video/mp4">
      </video>

      <div class="video-controls video">
        <button class="video-btn video-btn__pause" id="video-btn-pause" v-if="enable_autoplay">
          <span class="element-invisible">Pause</span>
        </button>
        <button class="video-btn video-btn__play" id="video-btn-play" v-else>
          <span class="element-invisible">Play</span>
        </button>
      </div>
    </div>
    \`
  })
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const x=["Image","EmbedVideo","VerticalVideo","HorizontalVideo"];export{a as EmbedVideo,s as HorizontalVideo,e as Image,o as VerticalVideo,x as __namedExportsOrder,y as default};
