<template>

</template>

<script>
import { ref, reactive } from 'vue'
import axios from "axios";

export default {
  name: "AddAuthorPage",

  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const birthDate = ref('')
    const deathDate = ref('')
    const gender = ref('')



    return {
      firstName,
      lastName,
      birthDate,
      deathDate

    }
  }
}
</script>

<style scoped>

</style>
