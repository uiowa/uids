/* empty css                    *//* empty css             *//* empty css                  *//* empty css                 *//* empty css              */import{_ as l}from"./Button.vue_vue_type_script_setup_true_lang-BWl288u-.js";import{B as t}from"./BrandBar-Cm3xyW7s.js";import"./vue.esm-bundler-5gA9mrtU.js";import"./utlity-CAV5GFHh.js";import"./Logo.vue_vue_type_script_setup_true_lang-C5A6dmQv.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const g={title:"Showcase/Forms",tags:["!autodocs"],parameters:{layout:"fullscreen",docs:{source:{code:null}}}},o=["Preview","Status","Memberships","Introduction","Profile Photo","Contacts","Websites","Positions","Education","Graduate Program Affiliations","Center, Program, and Institute Affiliations","Research Interests","Licenses & Certifications","Publications"],d={render:r=>({components:{UidsButton:l,BrandBar:t},setup(){return{args:r,sidebarMenu:o}},template:`
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
          <ul class="menu menu--horizontal">
            <li>
              <a href="#"><i style='color: var(--brand-secondary)' class="fas fa-house"></i> Home</a>
            </li>
            <li>
              <a href="#"><i style='color: var(--brand-secondary)' class="fas fa-users"></i> Directories <i style='color: var(--brand-secondary)' class="icon-after fas fa-angle-down"></i></a>
            </li>
            <li>
              <a href="#"><i style='color: var(--brand-secondary)' class="fas fa-file-lines"></i> Reports</a>
            </li>
            <li>
              <a href="#"><i style='color: var(--brand-secondary)' class="fas fa-user-gear"></i> Roles</a>
            </li>
            <li>
              <a href="#"><i style='color: var(--brand-secondary)' class="fas fa-mobile-screen"></i> Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="layout-container element--margin__top--extra">
        <div class="content flex flex--wrap flex--gap__md">
          <div class="sidebar flex--2 bg--gray element--padding__all--sm">
            <div class="uids-form">
              <div class="form-item">
                <select class="form-select">
                  <option id="medicine">Medicine</option>
                  <option id="uiowa">University of Iowa</option>
                </select>
              </div>
            </div>
            <div>
              <ul class="menu">
                <li v-for="menuItem in sidebarMenu">
                  <a href="#" :class="{ 'is-active': menuItem === 'Introduction' }">{{ menuItem }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-panel flex--8">
            <div class="breadcrumb">
              Directory
            </div>
            <h1 class="headline headline--serif">Francois Abboud</h1>
            <p class="element--light-intro">Introduction</p>
            <form class="uids-form element--margin__top--extra">
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
                  <label for="suffix">Middle</label>
                  <input type="text" id="suffix" placeholder="Jr, Sr, III">
                </div>
              </div>
              <div class="flex flex--wrap flex--gap__sm">
                <div class="form-item flex--1">
                  <label for="middle">Credentials</label>
                  <input type="text" id="middle" placeholder="BS, MS, PhD">
                  <div class="description">No periods in degrees – PhD, not Ph.D.</div>
                </div>
                <div class="form-item flex--1">
                  <label for="email">Email</label>
                  <input type="text" id="email" placeholder="first-last@uiowa.edu">
                  <div class="description">UI email address</div>
                </div>
              </div>
              <div class="form-item">
                <label for="title">Directory Title</label>
                <input type="text" id="title" placeholder="Professor of Microbiology">
                <div class="description">Most prominent UI role (e.g. Dean, DEO, Director, Endowed Position)</div>
              </div>
              <div class="form-item">
                <label for="introduction">Introduction</label>
                <textarea id="introduction" name="textarea" rows="5" cols="60"
                          aria-describedby="introduction--description"></textarea>
                <div id="introduction--description" class="description">Textarea description goes here.</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `})},e={...d};var i,a,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...Template
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const _=["ApplicationFormLayout"];export{e as ApplicationFormLayout,_ as __namedExportsOrder,g as default};
