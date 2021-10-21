<template>
<div class="row">
  <div class="col-4">

  </div>
  <div class="col-8">

  </div>

</div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: "SingleBookPage",
  setup() {

    const title = ref ('')
    const authors = ref ([])
    const translators = ref ([])
    const subjects = ref ([])
    const bookshelves = ref ([])
    const languages = ref ([])
    const media_type = ref ('')
    const formats = ref ('')
    const download_count = ref (0)

    return {

      title,
      authors,
      translators,
      subjects,
      bookshelves,
      languages,
      media_type,
      formats,
      download_count
    }
  }
}

</script>

<style scoped>

</style>
