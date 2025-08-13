/* empty css                    *//* empty css             *//* empty css                  *//* empty css                 *//* empty css              */import{_ as c}from"./Button.vue_vue_type_script_setup_true_lang-BWl288u-.js";import{B as u}from"./BrandBar-Cm3xyW7s.js";import{_ as p}from"./Table.vue_vue_type_script_setup_true_lang-y0ixtvDA.js";import"./vue.esm-bundler-5gA9mrtU.js";import"./utlity-CAV5GFHh.js";import"./Logo.vue_vue_type_script_setup_true_lang-C5A6dmQv.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const A={title:"Showcase/Forms",tags:["!autodocs"],parameters:{layout:"fullscreen",docs:{source:{code:null}}}},n={render:d=>({components:{UidsButton:c,BrandBar:u,UidsTable:p},setup(){return{args:d}},template:`
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
          ><i style="color: var(--brand-secondary)" class="fas fa-user"></i>  HawkID <i style="color: var(--brand-secondary)" class="fas fa-caret-down"></i></uids-button>
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

        <div class="breadcrumb">
          Directory
        </div>
        <h1 class="headline headline--serif">University Directory</h1>

          <div :class="args.showSidebar ? 'content element--margin__top--extra flex flex--wrap flex--gap__md' : 'content element--margin__top--extra'">
          <aside :class="args.showSidebar ? 'flex--3' : 'flex--12'">
            <div :class="args.showSidebar ? 'bef-form bef-form--sidebar' : 'bef-form'">
              <form class="views-exposed-form element--margin__bottom--extra  bef-exposed-form uids-form bg--gray" action="/events" method="get" id="views-exposed-form-events-page-upcoming" accept-charset="UTF-8" data-drupal-form-fields="">
                <div class="form--inline clearfix">
                  <div class="form-item form-type-textfield form-item-combine">
                    <label class="element-invisible" for="edit-combine">Search</label>
                    <input type="text" id="edit-combine" name="combine" value="" size="30" maxlength="128" placeholder="Search directory" class="form-text">
                  </div>

                  <details class="bef--secondary form-wrapper" id="edit-secondary" open="open">
                    <summary role="button" aria-controls="edit-secondary" aria-expanded="true">Filters<span class="summary"></span></summary>
                    <div class="details-wrapper">

                      <div class="form-item form-type-date form-item-field-event-when-end-value">
                        <label for="edit-field-event-when-end-value">Departments</label>
                        <select autocomplete="off" class="disabled:cursor-not-allowed md text-ui-gray-900 text-opacity-40">
                          <option selected="" value="">All Departments</option>
                          <option value="3100">Anatomy and Cell Biology</option>
                          <option value="3200">Anesthesia</option>
                          <option value="3110">Biochemistry and Molecular Biology</option>
                          <option value="3273">Cardiothoracic Surgery</option>
                          <option value="3205">Dermatology</option>
                          <option value="3272">Emergency Medicine</option>
                          <option value="3210">Family Medicine</option>
                          <option value="3215">Internal Medicine</option>
                          <option value="3120">Microbiology and Immunology</option>
                          <option value="3140">Molecular Physiology and Biophysics</option>
                          <option value="3220">Neurology</option>
                          <option value="3130">Neuroscience and Pharmacology</option>
                          <option value="3271">Neurosurgery</option>
                          <option value="3225">Obstetrics and Gynecology</option>
                          <option value="3230">Ophthalmology and Visual Sciences</option>
                          <option value="3240">Orthopedics and Rehabilitation</option>
                          <option value="3245">Otolaryngology</option>
                          <option value="3250">Pathology</option>
                          <option value="3255">Pediatrics</option>
                          <option value="3325">Physical Therapy and Rehabilitation Science</option>
                          <option value="3330">Physician Assistant</option>
                          <option value="3260">Psychiatry</option>
                          <option value="3266">Radiation Oncology</option>
                          <option value="3265">Radiology</option>
                          <option value="3270">Surgery</option>
                          <option value="3275">Urology</option>
                        </select>
                      </div>

                      <div class="form-item form-type-date form-item-field-event-when-value">
                        <label for="edit-field-event-when-value">College</label>
                        <select autocomplete="off" class="disabled:cursor-not-allowed md">
                          <option selected="" value="17">Carver College of Medicine</option>
                        </select>
                      </div>

                      <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                        <label for="edit-field-event-performer-target-id-1">Membership</label>
                        <select id="membership-type-454080" autocomplete="off" class="disabled:cursor-not-allowed sm rounded text-ui-gray-900 text-opacity-40" size="0">
                          <option selected="" value="">All</option>
                          <option value="PRIMARY">Primary</option>
                          <option value="SECONDARY">Secondary</option>
                        </select>
                      </div>

                      <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                        <label for="edit-field-event-performer-target-id-1">Person type</label>
                        <select id="edit-type" name="type" class="form-select">
                          <option value="All" selected="selected">- Any -</option>
                          <option value="emeritus">Emeritus</option>
                          <option value="faculty">Faculty</option>
                          <option value="grad_assistant">Graduate Assistant</option>
                          <option value="phd_candidate">PhD Candidate</option>
                          <option value="staff">Staff</option>
                          <option value="student">Student</option>
                        </select>
                      </div>

                      <div class="form-item form-type-entity-autocomplete form-item-field-event-performer-target-id-1">
                        <label for="edit-field-event-performer-target-id-1">Status</label>
                        <select id="edit-type" name="type" class="form-select">
                          <option value="All" selected="selected">- Any -</option>
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="retired">Retired</option>
                        </select>
                      </div>

                    </div>
                  </details>

                  <div class="form-actions form-wrapper" id="edit-actions">
                    <input type="submit" id="edit-submit" value="Search" class="button form-submit">
<!--                input type="submit" id="edit-reset" name="reset" value="Reset" class="button form-submit">-->
                  </div>

                </div>
              </form>
            </div>
          </aside>


          <div class="main-panel" :class="args.showSidebar ? 'flex--10' : 'flex--12'">

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
      </div>
    `})},e={...n,args:{showSidebar:!1}},t={...n,args:{showSidebar:!0}};var a,o,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  ...Template,
  args: {
    showSidebar: false
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var r,s,l;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  ...Template,
  args: {
    showSidebar: true
  }
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const D=["ApplicationFormDirectory","ApplicationFormDirectoryWithSidebar"];export{e as ApplicationFormDirectory,t as ApplicationFormDirectoryWithSidebar,D as __namedExportsOrder,A as default};
