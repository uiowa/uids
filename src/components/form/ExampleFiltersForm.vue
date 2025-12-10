<script setup lang="ts">
import { computed } from "vue";

import UidsButton from '../button/Button.vue';
import UidsFormFieldset from '../form/FormFieldset.vue';
import UidsFormCollapsible from '../form/FormCollapsible.vue';

import '../../scss/components/form.scss';
import '../../scss/components/button.scss';

const props = defineProps({
  collapsible: {
    type: Boolean,
    default: false,
  }
});
const filterComponent = computed(() => {
  if (props.collapsible) {
    return UidsFormCollapsible;
  }
  return UidsFormFieldset;
})
</script>
<template>
  <form class="form" action="/" method="get"
        accept-charset="UTF-8">

    <component
      :is="filterComponent"
      class="form--inline form--light form--small form--compact"
      label="Filters"
      inline
    >

      <div class="form-item">
        <label for="edit-college">College</label>
        <select id="edit-college" name="college" autocomplete="off">
          <option selected="" value="17">Carver College of Medicine</option>
        </select>
      </div>

      <div class=" form-item">
        <label for="edit-department">Department</label>
        <select id="edit-department" name="department" autocomplete="off">
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

      <div class=" form-item">
        <label for="edit-membership">Membership</label>
        <select id="edit-membership" name="membership" autocomplete="off">
          <option selected="" value="">All</option>
          <option value="PRIMARY">Primary</option>
          <option value="SECONDARY">Secondary</option>
        </select>
      </div>

      <div class="form-item">
        <label for="edit-person-type">Person type</label>
        <select id="edit-person-type" name="type">
          <option value="All" selected="selected">- Any -</option>
          <option value="emeritus">Emeritus</option>
          <option value="faculty">Faculty</option>
          <option value="grad_assistant">Graduate Assistant</option>
          <option value="phd_candidate">PhD Candidate</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div class=" form-item">
        <label for="edit-status">Status</label>
        <select id="edit-status" name="status">
          <option value="All" selected="selected">- Any -</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="retired">Retired</option>
        </select>
      </div>
    </component>

    <div class="form--flex form--large form--compact">
      <div class="form-item">
        <label class="element-invisible" for="edit-search">Search</label>
        <input type="text" id="edit-search" name="search" value="" size="30" maxlength="128"
               placeholder="Search directory">
      </div>
      <div class="form-actions">
        <button type="submit" name="search" value="Search" class="bttn bttn--primary">
          <span>Search</span>
        </button>
        <button type="submit" name="reset" value="Reset" class="bttn bttn--secondary">
          <span>Reset</span>
        </button>
      </div>
    </div>

  </form>
</template>
