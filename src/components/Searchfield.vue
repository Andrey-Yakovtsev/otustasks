<template>
  <q-input filled
           v-model="text"
           label="Поищи мной книгу или автора (на английском). Например: war tolstoy"
           >

    <template v-slot:append>
      <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
      <q-icon v-model="text" name="search" @click="$emit('doSearch', text)" />
    </template>

  </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "Searchfield",

  setup () {
    let text = ref('')

    return { text }
  }
}
</script>

<style lang="sass" scoped>

</style>
