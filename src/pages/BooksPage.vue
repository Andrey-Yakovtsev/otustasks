<template>
  <q-page class="flex flex-center">
    <q-btn @click="getBooksByAPI">
      Save some books to LocalStorage
    </q-btn>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="book in bookslist" :key="book.id">
        <!--      <q-skeleton v-if="!img" height="200px" square /> TODO приделать лоадер-->
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
  </q-page>
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
      then((response) => {bookslist.value = response.data.results}).
      catch(error => console.log(error));
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
