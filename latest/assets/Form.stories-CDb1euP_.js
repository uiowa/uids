import{d as p,o as n,c as l,f as a,s as y,j as c,u as g,k as x,h as _,b as k,y as S,n as N,t as A,F as C}from"./vue.esm-bundler-ICYXiNBd.js";/* empty css             *//* empty css               */import{_ as h}from"./FormFieldset.vue_vue_type_script_setup_true_lang-BGr9s8wG.js";const M={class:"form form--flex form--compact",method:"POST",action:""},w=p({__name:"ExampleSearch",props:{},setup(e){return(o,i)=>(n(),l("form",M,i[0]||(i[0]=[a("div",{class:"form-item"},[a("label",{class:"element-invisible",for:"search"},"Search"),a("input",{type:"text",id:"search",name:"search",value:"",size:"30",maxlength:"128",placeholder:"Search"})],-1),a("button",{type:"submit",name:"submit",value:"Search",class:"bttn bttn--primary"},"Search",-1)])))}}),O={class:"form-item"},I={key:0,class:"form-item__description"},D=p({__name:"FormItem",setup(e){const o=y();return(i,t)=>(n(),l("div",O,[c(i.$slots,"default"),g(o).description?(n(),l("div",I,[c(i.$slots,"description")])):x("",!0)]))}}),F=["id","type","name","value"],T=["for"],R=p({__name:"FormCheckboxOrRadioGroup",props:{label:{type:String,required:!1},type:{type:String,default:"radio"},items:{type:Array}},setup(e){return(o,i)=>(n(),_(h,{label:e.label},{default:k(()=>[(n(!0),l(C,null,S(e.items,t=>(n(),l("div",{class:N(["form-item","form-type-"+e.type])},[a("input",{id:t.id,type:e.type,name:t.name,value:t.value},null,8,F),a("label",{for:t.id},A(t.label),9,T)],2))),256))]),_:1},8,["label"]))}}),L={title:"Components/Form",parameters:{docs:{source:{code:null}}},tags:["autodocs"],argTypes:{section1_compact:{name:"Compact"},section1_large:{name:"Large"},section1_inline:{name:"Inline"},section1_flex:{name:"Flex"}}},E=[{id:"text-permission-yes",name:"permission",value:!0,label:"Yes"},{id:"text-permission-no",name:"permission",value:!1,label:"No"}],V=[{id:"financial-aid",name:"interests",value:"FINANCIAL_AID",label:"Costs & Financial Aid"},{id:"marching-band",name:"interests",value:"MARCHING_BAND",label:"Hawkeye Marching Band"},{id:"rotc-air-force",name:"interests",value:"ROTC_AIR_FORCE",label:"ROTC - Air Force (Aerospace Studies)"},{id:"rotc-army",name:"interests",value:"ROTC_ARMY",label:"ROTC - Army (Military Science)"},{id:"study-abroad",name:"interests",value:"STUDY_ABROAD",label:"Study Abroad"},{id:"band",name:"interests",value:"BAND",label:"University Concert Bands and Jazz Bands"},{id:"honors",name:"interests",value:"HONORS",label:"University Honors Program"},{id:"veteran-services",name:"interests",value:"VETERAN_SERVICES",label:"Veteran & Military Connected Student Services"}],H={render:e=>({components:{ExampleSearch:w},setup(){return{args:e}},template:`
      <div class="layout-container">
        <example-search></example-search>
      </div>
    `})},s={...H},W={render:e=>({components:{UidsFormFieldset:h,UidsFormItem:D,UidsFormCheckboxOrRadioGroup:R},setup(){return{args:e,checkboxRadioOptions:E,checkboxOptions:V}},computed:{formSection1Classes(){let o=[];return e.section1_large&&o.push("form--large"),e.section1_compact&&o.push("form--compact"),e.section1_inline&&o.push("form--inline"),e.section1_flex&&o.push("form--flex"),o}},template:`
      <div class="layout-container">
        <form class="form" method="POST" action="" :class="formSection1Classes">

          <uids-form-item>
            <label class="form-required" for="last-name">Text</label>
            <input id="last-name" maxlength="50" type="text">
            <template #description>Description</template>
          </uids-form-item>

          <div class="form-item">
            <label class="form-required" for="email">Email</label>
            <input id="email" maxlength="255" type="email">
          </div>

          <div class="form-item">
            <label for="home-phone">Phone</label>
            <input id="home-phone" maxlength="12" type="tel">
          </div>

          <uids-form-item>
            <label for="search">Search</label>
            <input type="search" id="search" name="search">
          </uids-form-item>

          <uids-form-item>
            <label class="form-required" for="state">Select</label>
            <select id="state">
              <option value="">- None -</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AS">American Samoa</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </uids-form-item>

          <uids-form-checkbox-or-radio-group
            label="Radios"
            type="radio"
            :items="checkboxRadioOptions"
          />

          <uids-form-checkbox-or-radio-group
            label="Radios inline"
            type="radio"
            :items="checkboxRadioOptions"
            inline
          />

          <div class="form-item">
            <label class="form-required" for="states">Select</label>
            <select id="states">
              <option value="">- None -</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AS">American Samoa</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div class="form-item">
            <label class="form-required" for="birth-date">Date</label>
            <input id="birth-date" type="date">
          </div>

          <label for="home-phone">Multi select checkbox</label>
          <details class="form-item form__details--multi-select">
            <summary>Genre<span class="summary"></span></summary>
            <div class="details-wrapper">
              <div class="form-checkboxes">
                <fieldset class="details-multi-select-checkboxes">
                  <legend class="visually-hidden">Select one or more genres</legend>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-childrens--Y2idzqPWjuo"
                           name="field_event_genre_value[Childrens]" value="Childrens" class="form-checkbox">
                    <label for="edit-field-event-genre-value-childrens--Y2idzqPWjuo" class="option">Children's</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-essay--qn92WZNFxVQ"
                           name="field_event_genre_value[Essay]" value="Essay" class="form-checkbox">
                    <label for="edit-field-event-genre-value-essay--qn92WZNFxVQ" class="option">Essay</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-fantasy--qsdFbcezUn0"
                           name="field_event_genre_value[Fantasy]" value="Fantasy" class="form-checkbox">
                    <label for="edit-field-event-genre-value-fantasy--qsdFbcezUn0" class="option">Fantasy</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-fiction--F547iWBi4wg"
                           name="field_event_genre_value[Fiction]" value="Fiction" class="form-checkbox">
                    <label for="edit-field-event-genre-value-fiction--F547iWBi4wg" class="option">Fiction</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A"
                           name="field_event_genre_value[HybridForms]" value="HybridForms" class="form-checkbox">
                    <label for="edit-field-event-genre-value-hybridforms--NgTo0EtnD_A" class="option">Hybrid Forms</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-memoir--HVUn8CLgzqg"
                           name="field_event_genre_value[Memoir]" value="Memoir" class="form-checkbox">
                    <label for="edit-field-event-genre-value-memoir--HVUn8CLgzqg" class="option">Memoir</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-middlegrade--ueW_97yE7nY"
                           name="field_event_genre_value[MiddleGrade]" value="MiddleGrade" class="form-checkbox">
                    <label for="edit-field-event-genre-value-middlegrade--ueW_97yE7nY" class="option">Middle Grade</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-nonfiction--RO3rViX_wJI"
                           name="field_event_genre_value[Nonfiction]" value="Nonfiction" class="form-checkbox">
                    <label for="edit-field-event-genre-value-nonfiction--RO3rViX_wJI" class="option">Nonfiction</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-novel--nY9Utkyye3w"
                           name="field_event_genre_value[Novel]" value="Novel" class="form-checkbox">
                    <label for="edit-field-event-genre-value-novel--nY9Utkyye3w" class="option">Novel</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-playwriting--nTE1KzbGVyM"
                           name="field_event_genre_value[Playwriting]" value="Playwriting" class="form-checkbox">
                    <label for="edit-field-event-genre-value-playwriting--nTE1KzbGVyM" class="option">Playwriting</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-poetry--YJd6UDHH86E"
                           name="field_event_genre_value[Poetry]" value="Poetry" class="form-checkbox">
                    <label for="edit-field-event-genre-value-poetry--YJd6UDHH86E" class="option">Poetry</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44"
                           name="field_event_genre_value[ScienceFiction]" value="ScienceFiction" class="form-checkbox">
                    <label for="edit-field-event-genre-value-sciencefiction--s7nRw8QKJ44" class="option">Science
                      Fiction</label>
                  </div>

                  <div class="form-type-checkbox form-item">
                    <input type="checkbox" id="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                           name="field_event_genre_value[Screenwriting]" value="Screenwriting" class="form-checkbox">
                    <label for="edit-field-event-genre-value-screenwriting--3SCKNL7gdww"
                           class="option">Screenwriting</label>
                  </div>
                </fieldset>
              </div>
            </div>
          </details>

          <div class="form-item form-item-multiselect">
            <label for="multiselect">Multi select</label>
            <select id="multiselect" multiple="multiple" name="multiselect[]" class="form-select">
              <option value="High School">High School</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
              <option value="Some College">Some College</option>
            </select>
          </div>

          <div class="form-item">
            <label for="disabled-field">Disabled</label>
            <input id="disabled-field" type="text" name="disabled" value="" size="60" maxlength="255"
                   placeholder="This field is disabled" disabled="disabled">
          </div>

          <div class="form-item">
            <label for="readonly-field">Readonly</label>
            <input id="readonly-field" type="text" name="readonly" value="" size="60" maxlength="255"
                   placeholder="Readonly" readonly="readonly">
          </div>

          <div class="form-item">
            <label for="edit-textarea">Textarea</label>
            <textarea id="edit-textarea" name="textarea" rows="5" cols="60"
                      aria-describedby="edit-textarea--description"></textarea>
            <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
          </div>

          <uids-form-checkbox-or-radio-group
            label="Checkboxes"
            type="checkbox"
            :items="checkboxOptions"
          />

          <uids-form-checkbox-or-radio-group
            label="Checkboxes inline"
            type="checkbox"
            :items="checkboxOptions"
            inline
          />

          <hr />

          <div class="form-item form-type-checkbox">
            <input
              id="agree-terms"
              type="checkbox"
              name="terms"
              value="true"
            >
            <label for="agree-terms">
              I agree to the terms and conditions
            </label>
          </div>
        </form>
      </div>
    `})},r={...W,args:{section1_large:!1,section1_compact:!1,section1_inline:!1,section1_flex:!1}};var d,u,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...SearchBarTemplate
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var v,f,b;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  ...Template,
  args: {
    section1_large: false,
    section1_compact: false,
    section1_inline: false,
    section1_flex: false
  }
}`,...(b=(f=r.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const z=["SearchBar","KitchenSink"];export{r as KitchenSink,s as SearchBar,z as __namedExportsOrder,L as default};
