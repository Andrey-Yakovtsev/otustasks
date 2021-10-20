<template>
  <q-btn @click="getBooksByAPI">
    Get books
  </q-btn>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" v-for="book in bookslist" :key="book.id">
      <img :src="`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`">
      <q-card-section>
        <div class="text-h6">{{book.title}}</div>
        <div class="text-subtitle2">by {{book.authors[0].name}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Download count: {{ book.download_count}}
      </q-card-section>
    </q-card>

</div>
</template>

<script>
import axios from "axios";
import { ref, reactive } from 'vue'

export default {
  name: "BooksPage",
  setup () {
    let bookslist = ref ( [])
    function getBooksByAPI () {
      axios.get('https://gutendex.com/books/').
      then((response) => {bookslist.value = response.data.results})
      console.log(bookslist)
      // catch(error => console.log(error));
      // console.log('bookslist.value', bookslist)
      // console.log('response', response)
      // console.log('response.data', response.data)
      // then((response) => {console.log(response.data.results)})
    }

  return {
      bookslist,
    getBooksByAPI,

  }

  }


}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
