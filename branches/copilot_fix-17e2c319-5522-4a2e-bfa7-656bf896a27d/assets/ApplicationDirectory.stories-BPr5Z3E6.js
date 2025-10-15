/* empty css                    *//* empty css                 *//* empty css                  *//* empty css             *//* empty css              */import{_ as l}from"./Button.vue_vue_type_script_setup_true_lang-DTPkAwzt.js";import{B as i}from"./BrandBar-BwuOojRt.js";import{_ as d}from"./Table.vue_vue_type_script_setup_true_lang-jyW7dBAW.js";import{_ as n}from"./Menu.vue_vue_type_script_setup_true_lang-Cd1eNvl-.js";import"./vue.esm-bundler-BvXj7D1s.js";import"./utlity-CAV5GFHh.js";import"./Logo.vue_vue_type_script_setup_true_lang-Bt9ptoEF.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const P={title:"Showcase/Application",tags:["!autodocs"],parameters:{layout:"fullscreen",docs:{source:{code:null}}}},o=[{label:"Home",url:"#",icon:"fas fa-house"},{label:"Directories",url:"#",icon:"fas fa-users",children:[]},{label:"Reports",url:"#",icon:"fas fa-file-lines"},{label:"Roles",url:"#",icon:"fas fa-user-gear"},{label:"Contact",url:"#",icon:"fas fa-mobile-screen"}],u={render:a=>({components:{UidsButton:l,BrandBar:i,UidsTable:d,UidsMenu:n},setup(){return{args:a,horizontalMenuItems:o}},template:`
      <brand-bar
        :narrow='true'
        :healthcare='false'
      >
        <h1 class="site-name flex--10">Profiles</h1>
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

        <div class="breadcrumb">
          Directory
        </div>
        <h1 class="headline headline--serif">University Directory</h1>

        <div class="main-panel">

          <uids-table
            summary="University Directory - Staff and Faculty Listing"
            caption="Directory Listing"
            :sticky="true"
            :highlight="true"
            :border="true"
          >
            <template #thead>
              <tr>
                <th scope="col">Actions</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Title</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </template>
            <template #tbody>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>John Smith</td>
                <td>Computer Science</td>
                <td>Professor</td>
                <td>john.smith@university.edu</td>
                <td>(319) 555-0123</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Jane Doe</td>
                <td>Mathematics</td>
                <td>Associate Professor</td>
                <td>jane.doe@university.edu</td>
                <td>(319) 555-0124</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Bob Johnson</td>
                <td>Physics</td>
                <td>Department Chair</td>
                <td>bob.johnson@university.edu</td>
                <td>(319) 555-0125</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Alice Williams</td>
                <td>Biology</td>
                <td>Research Scientist</td>
                <td>alice.williams@university.edu</td>
                <td>(319) 555-0126</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Michael Chen</td>
                <td>Chemistry</td>
                <td>Assistant Professor</td>
                <td>michael.chen@university.edu</td>
                <td>(319) 555-0127</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Sarah Martinez</td>
                <td>English Literature</td>
                <td>Professor</td>
                <td>sarah.martinez@university.edu</td>
                <td>(319) 555-0128</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>David Thompson</td>
                <td>History</td>
                <td>Associate Professor</td>
                <td>david.thompson@university.edu</td>
                <td>(319) 555-0129</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Lisa Garcia</td>
                <td>Psychology</td>
                <td>Clinical Professor</td>
                <td>lisa.garcia@university.edu</td>
                <td>(319) 555-0130</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Robert Anderson</td>
                <td>Engineering</td>
                <td>Dean</td>
                <td>robert.anderson@university.edu</td>
                <td>(319) 555-0131</td>
              </tr>
              <tr>
                <td><uids-button :url="''" :color="'link'" :size="'small'" :borderless="true" :full="false" :transparent="true" :light_font="true">Edit <i style="color: var(--brand-secondary)" class="fas fa-pencil"></i></uids-button></td>
                <td>Emily Rodriguez</td>
                <td>Art & Design</td>
                <td>Lecturer</td>
                <td>emily.rodriguez@university.edu</td>
                <td>(319) 555-0132</td>
              </tr>
            </template>
          </uids-table>

          <nav class="pager">
            <div class="visually-hidden">Pagination</div>
            <ul class="pager">
              <li class="pager is-active">
                <a href="/">
                  <span class="visually-hidden">Current page</span>1
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>2
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>3
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Page</span>4
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Next page</span>
                  <span>Next ›</span>
                </a>
              </li>
              <li class="pager">
                <a href="/">
                  <span class="visually-hidden">Last page</span>
                  <span>Last »</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `})},t={...u,args:{showSidebar:!1}};var e,s,r;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  ...Template,
  args: {
    showSidebar: false
  }
}`,...(r=(s=t.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const k=["Directory"];export{t as Directory,k as __namedExportsOrder,P as default};
