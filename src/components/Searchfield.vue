<template>
  <q-input filled v-model="text" label="Поищи мной книгу или автора" :dense="dense">

    <template v-slot:append>
      <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
      <q-icon name="search" @click="searchItem" />
    </template>

  </q-input>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "Searchfield",

  setup () {

    const searchItem = () => {
      console.log('SEARCH CLICK')
    }

    return {
      // searchItem: function (),
      text: ref(''),
      ph: ref(''),
      dense: ref(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
