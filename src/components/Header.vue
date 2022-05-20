<template>
  <header>
    <div class="wrapper">
      <div>
        <uids-logo></uids-logo>
      </div>
      <div>
        <uids-button size="small" @click="$emit('logout')" v-if="user">Log out</uids-button>
        <uids-button size="small" @click="$emit('login')" v-if="!user" color="secondary">Log in</uids-button>
        <uids-button @click="$emit('createAccount')" v-if="!user">Sign up</uids-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import './header.css';
import UidsLogo from './logo/Logo.vue'
import UidsButton from './Button.vue'

const name = 'my-header'
const props = defineProps({
  user: {
    type: Object,
  },
})
const emits = defineEmits(['login', 'logout', 'createAccount'])
</script>
