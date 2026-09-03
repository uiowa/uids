import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-DTFrD0u7.js";import{n,t as r}from"./Button-u0HLwm3x.js";import{t as i}from"./_headline-BJlwSH4Y.js";import{t as a}from"./_grid-DZmDGna5.js";import{n as o,t as s}from"./BrandBar-D3L7hVLC.js";import{t as c}from"./form-snQAyGxd.js";import{n as l,t as u}from"./Menu-BRJlVWRm.js";import{n as d,t as f}from"./_flexbox-CoE_T4Ar.js";var p,m,h,g,_,v;e((()=>{t(),d(),i(),c(),f(),a(),n(),o(),l(),p={title:`Showcase/Application`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},m=[{label:`Home`,url:`#`,icon:`fas fa-house`},{label:`Directories`,url:`#`,icon:`fas fa-users`,children:[]},{label:`Reports`,url:`#`,icon:`fas fa-file-lines`},{label:`Roles`,url:`#`,icon:`fas fa-user-gear`},{label:`Contact`,url:`#`,icon:`fas fa-mobile-screen`}],h=[{label:`Preview`,url:`#`},{label:`Status`,url:`#`},{label:`Memberships`,url:`#`},{label:`Introduction`,url:`#`,active:!0},{label:`Profile Photo`,url:`#`},{label:`Contacts`,url:`#`},{label:`Websites`,url:`#`},{label:`Positions`,url:`#`},{label:`Education`,url:`#`},{label:`Graduate Program Affiliations`,url:`#`},{label:`Center, Program, and Institute Affiliations`,url:`#`},{label:`Research Interests`,url:`#`},{label:`Licenses & Certifications`,url:`#`},{label:`Publications`,url:`#`}],g={render:e=>({components:{UidsButton:r,BrandBar:s,UidsMenu:u},setup(){return{args:e,horizontalMenuItems:m,sidebarMenuItems:h}},template:`
      <main>
      <brand-bar
        :narrow='true'
        :healthcare='false'
      >
        <h1 class="site-name flex--10">Profiles</h1>
        <div class="user-menu-toggle bg--gold">
          <uids-button
            :url=""
            :color='link'
            :size='small'
            :borderless='true'
            :full='false'
            :transparent='true'
            :light_font='true'
          ><i style="color: var(--brand-secondary)" class="fas fa-user"></i> HawkID <i style="color: var(--brand-secondary)" class="fas fa-caret-down"></i></uids-button>
          <ul class="menu">
            <li><a href="/">Sign out</a></li>
          </ul>
        </div>
      </brand-bar>
      <nav class="menu--container">
        <div class="layout-container">
          <uids-menu
            variant="horizontal"
            :items="horizontalMenuItems"
            label="Main"
            top
          />
        </div>
      </nav>
      <div class="layout-container element--margin__top--extra">
        <div class="content flex flex--wrap flex--gap__md">
          <div class="sidebar flex--2 bg--gray">
            <uids-menu
              variant="vertical"
              :items="sidebarMenuItems"
              label="Sidebar menu"
              top
            />
          </div>
          <div class="main-panel flex--8" role="region" aria-label="Main content">
            <div class="breadcrumb">
              Directory
            </div>
            <h1 class="headline headline--serif">Francois Abboud</h1>
            <p class="element--light-intro">Introduction</p>
            <form class="form element--margin__top--extra">
              <div class="flex flex--wrap flex--gap__sm">
                <div class="form-item flex--3">
                  <label for="first">First</label>
                  <input type="text" id="first" placeholder="First">
                </div>
                <div class="form-item flex--1">
                  <label for="middle">Middle</label>
                  <input type="text" id="middle" placeholder="Middle">
                </div>
                <div class="form-item flex--3">
                  <label for="last">Last</label>
                  <input type="text" id="last" placeholder="Last">
                </div>
                <div class="form-item flex--1">
                  <label for="suffix">Suffix</label>
                  <input type="text" id="suffix" placeholder="Jr, Sr, III">
                </div>
              </div>
              <div class="flex flex--wrap flex--gap__sm">
                <div class="form-item flex--1">
                  <label for="credentials">Credentials</label>
                  <input type="text" id="credentials" placeholder="BS, MS, PhD">
                  <div class="form-item__description">No periods in degrees – PhD, not Ph.D.</div>
                </div>
                <div class="form-item flex--1">
                  <label for="email">Email</label>
                  <input type="text" id="email" placeholder="first-last@uiowa.edu">
                  <div class="form-item__description">UI email address</div>
                </div>
              </div>
              <div class="form-item">
                <label for="title">Directory Title</label>
                <input type="text" id="title" placeholder="Professor of Microbiology">
                <div class="form-item__description">Most prominent UI role (e.g. Dean, DEO, Director, Endowed Position)</div>
              </div>
              <div class="form-item">
                <label for="introduction">Introduction</label>
                <textarea id="introduction" name="textarea" rows="5" cols="60"
                          aria-describedby="introduction--description"></textarea>
                <div id="introduction--description" class="form-item__description">Textarea description goes here.</div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </main>
    `})},_={...g},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  ...Template
}`,..._.parameters?.docs?.source}}},v=[`Form`]}))();export{_ as Form,v as __namedExportsOrder,p as default};