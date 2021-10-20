<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import NavBar from "components/NavBar";

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavBar
  },

  setup () {

    return {

    }
  }
})
</script>
