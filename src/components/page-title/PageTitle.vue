<script setup lang="ts">
// _headline.scss supplies the `.headline` / `.headline--serif` classes this markup
// carries; page-title.scss supplies `.page-title` itself. Both are imported here
// because the dependency originates in the class string below, not in the SCSS.
import '../../scss/components/_headline.scss';
import '../../scss/components/page-title.scss';

// Markup mirrors uids_base templates/content/page-title.html.twig verbatim:
// <h1 class="page-title headline--serif headline">{{ title }}</h1>.
//
// The heading level is FIXED at h1 and is deliberately not an option: a page title is
// the document's main heading. (Use UidsHeadline when you need a configurable level.)
// `page-title--no-breadcrumbs` is the only class production varies, and it is applied
// only where no breadcrumb precedes the title — see contracts/page-title.json.

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  no_breadcrumbs: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <h1
    class="page-title headline--serif headline"
    :class="{ 'page-title--no-breadcrumbs': props.no_breadcrumbs }"
  >
    {{ props.title }}
  </h1>
</template>
