<template>
  <q-page class="flex flex-center">
    <q-card flat class="my-card">
      <Searchfield/>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Searchfield from "components/Searchfield";

export default defineComponent({
  name: 'PageIndex',
  components: {Searchfield}
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
  max-height: 100px
</style>
