import{i as e}from"./preload-helper-BL0Fm5OC.js";import{n as t,t as n}from"./BrandBar-C5ahImnY.js";import{n as r,t as i}from"./Breadcrumbs-Cqr4as4y.js";import{n as a,t as o}from"./Menu-BkaP9iSR.js";import{t as s}from"./_flexbox-B9MQ3-Z_.js";var c,l,u,d=e((()=>{t(),r(),a(),s(),c=`
  .tp__page { margin-top: calc(var(--tp-read) * 4); padding-bottom: calc(var(--tp-read) * 4); }
  /* the rail title: the Eyebrow role, which the component would set in uppercase */
  .tp__nav-title { font: var(--uiowa-typography-eyebrow-medium-font-weight) var(--uiowa-typography-eyebrow-medium-font-size) / var(--uiowa-typography-eyebrow-medium-line-height) var(--uiowa-typography-eyebrow-medium-font-family); text-transform: uppercase; }
  @media (max-width: 47.99rem) { .sidebar { margin-bottom: var(--uiowa-layout-space-section); } }
  .tp__nav-title { margin: 0 0 var(--tp-rel); padding: 0 1.5rem; text-box: trim-both cap alphabetic; }
  .tp__nav .menu li { border-bottom: 0; }
  .tp__nav .menu:not(ul ul) > li > a { font-weight: normal; }
  .tp__nav .menu li.is-active > a { background: var(--uiowa-color-background-gray); font-weight: bold; }
  .tp__nav .menu li.is-active > a::after { background: var(--uiowa-color-brand-gold); }
  .tp__nav .menu li.is-active li a::after { width: 0; height: 0; }
  .tp__nav a[href^="http"] { display: flex; align-items: center; gap: .4em; }
  .tp__nav a[href^="http"]::before { order: 1; color: var(--uiowa-color-neutral-500); content: ""; width: .7em; height: .7em; background: currentColor; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M7 1.5h3.5V5M10.5 1.5l-5 5M9 7.5v3H1.5V3h3' fill='none' stroke='black' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; }
  .tp__nav .icon-after { display: none; }
  .tp__nav hr { width: auto; margin: var(--tp-rel) 1.5rem; }
  @media (min-width: 48rem) { .sidebar { border-right: 1px solid var(--uiowa-color-border-default); } }
`,l=e=>[{id:`start`,items:[{label:`Overview`,url:`#`},{label:`Getting started`,url:`#`}]},{id:`foundations`,items:[{label:`Color`,url:`#`,active:e===`Color`},{label:`Typography`,url:`#`,active:e===`Typography`,expanded:e===`Typography`,children:[{label:`Hierarchy`,url:`#`}]},{label:`Imagery`,url:`https://brand.uiowa.edu/imagery`},{label:`Graphic Elements`,url:`https://brand.uiowa.edu/graphic-elements`},{label:`Icon Browser`,url:`https://icons.brand.uiowa.edu/`}]},{id:`build`,items:[{label:`Components`,children:[{label:`Alert`,url:`#`}]}]},{id:`resources`,items:[{label:`Brand Manual`,url:`https://brand.uiowa.edu/`}]}],u={name:`DocsFrame`,components:{BrandBar:n,UidsBreadcrumbs:i,UidsMenu:o},props:{current:{type:String,default:``},crumbs:{type:Array,default:()=>[]}},setup(e){return{css:c,groups:l(e.current)}},template:`
    <main :style="{ '--tp-read': 'var(--uiowa-typography-base-font-size)', '--tp-rel': 'var(--uiowa-typography-space-related)' }">
      <component :is="'style'">{{ css }}</component>
      <brand-bar :narrow="true" :healthcare="false">
        <p class="site-name">Design System</p>
      </brand-bar>
      <div class="layout-container tp__page">
        <div class="content flex flex--wrap flex--gap__md">
          <nav class="sidebar flex--2 tp__nav" aria-label="Design System">
            <p class="tp__nav-title">Design System</p>
            <template v-for="(g, i) in groups" :key="g.id">
              <hr v-if="i" class="element--spacer-thin">
              <uids-menu variant="vertical" :items="g.items" />
            </template>
          </nav>
          <div class="main-panel flex--8" role="region" aria-label="Main content">
            <uids-breadcrumbs :items="crumbs" />
            <slot></slot>
          </div>
        </div>
      </div>
    </main>
  `}}));export{d as n,u as t};