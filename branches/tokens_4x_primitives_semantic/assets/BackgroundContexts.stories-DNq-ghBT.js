import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./background-D9TKct7-.js";import{n as o,t as s}from"./Button-VOORarpL.js";import{t as c}from"./blockquote-BJrjZDfW.js";import{n as l,t as u}from"./Card-B_0gC8tu.js";import{t as d}from"./_border-DhwFjAmk.js";import{t as f}from"./tables-5XHs_nJd.js";var p,m,h,g,_;e((()=>{t(),d(),c(),f(),o(),l(),i(),r(),p={name:`context-sample`,components:{UidsButton:s,UidsCard:u},props:{heading:{type:String,required:!0},card_background:{type:String,default:``}},template:`
    <h3>{{ heading }}</h3>
    <p>Body copy with <a href="#">a link in a paragraph</a> and trailing text.</p>
    <p><a href="#">A link outside any content element</a></p>
    <uids-card :background="card_background" :url="'#'" :link_text="'Read more'">
      <template #title>Card</template>
      <div>Card body copy with <a href="#">a link</a>.</div>
    </uids-card>
    <div class="border">A <code>.border</code> element</div>
    <uids-button :url="'#'">Button</uids-button>
    <blockquote><p>A blockquote, which sets its own border color per background.</p></blockquote>
    <table>
      <thead><tr><th>Header</th><th>Header</th></tr></thead>
      <tbody><tr><td>Cell</td><td><a href="#">Cell link</a></td></tr></tbody>
    </table>
    <table class="table--gray-borders">
      <thead><tr><th>Gray borders</th><th>Header</th></tr></thead>
      <tbody><tr><td>Cell</td><td>Cell</td></tr></tbody>
    </table>
  `},m={title:`Showcase/Background contexts`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{outer_background:{...n.argTypes.section_background,name:`Outer background`},inner_background:{...n.argTypes.section_background,name:`Nested background`},card_background:{...a.argTypes.background,name:`Card background`,table:{category:`Component`}}}},h={render:e=>({components:{ContextSample:p},setup(){return{args:e}},template:`
      <div :class="args.outer_background" style="padding: 2rem;">
        <context-sample
          heading="Outer background"
          :card_background="args.card_background"
        />
        <div :class="args.inner_background" style="padding: 2rem; margin-top: 2rem;">
          <context-sample
            heading="Nested background"
            :card_background="args.card_background"
          />
        </div>
      </div>
    `})},g={...h,args:{outer_background:`bg--black`,inner_background:`bg--white`,card_background:``}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    outer_background: 'bg--black',
    inner_background: 'bg--white',
    card_background: ''
  }
}`,...g.parameters?.docs?.source}}},_=[`Contexts`]}))();export{g as Contexts,_ as __namedExportsOrder,m as default};