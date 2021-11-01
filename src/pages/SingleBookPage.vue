<template>
  <div class="row">
    <div class="col-4">


<!--      <q-img width="200px"-->
<!--             :src="book['formats']['image/jpeg']"-->
<!--      >-->
<!--      </q-img>-->
    </div>
    <div class="col-8">
            {{book['id']}}
      {{book['title']}}
      {{book['authors']}}
<!--      {{book['formats']['image/jpeg']}}-->
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";
export default {
  name: "SingleBookPage",
  setup() {
    const router = useRouter()
    const route = useRoute()

    // const title = ref ('')
    // const authors = ref ([])
    // const translators = ref ([])
    // const subjects = ref ([])
    // const bookshelves = ref ([])
    // const languages = ref ([])
    // const media_type = ref ('')
    // const formats = ref ('')
    // const download_count = ref (0)
    const book = ref ({})
    function getBook () {
      axios.get(`https://gutendex.com/books/${route.params.id}`).
      then((response) => {
        book.value = response.data;
        console.log('response.data', response.data)
      }).
      catch(error => console.log(error));
    }
    onMounted (getBook)

    return {
      book,

      // title,
      // authors,
      // translators,
      // subjects,
      // bookshelves,
      // languages,
      // media_type,
      // formats,
      // download_count
    }
  }
}

</script>

<style scoped>

</style>
