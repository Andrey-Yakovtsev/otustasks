<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="book in bookslist" :key="book.id">
        <!--      <q-skeleton v-if="!img" height="200px" square /> TODO приделать лоадер-->
<!--        <img :src="`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`">-->
        <img :src="book.formats['image/jpeg']">
        <q-card-section>
          <div class="text-h6">{{book.title}}</div>
          <div class="text-subtitle2">by {{book.authors.length > 0? book.authors[0].name : 'Unknown author' }}</div>
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
import { useStore } from 'vuex'
import { ref, onMounted, } from 'vue'
// import checkStoreState from '../hooks/use-checkStoreState'

export default {
  name: "BooksPage",

  setup () {
    const store = useStore()
    let bookslist = ref ([])
    // let bookslist = checkStoreState()

    function getBooksByAPI () {
      axios.get('https://gutendex.com/books/').
      then((response) => {bookslist.value = response.data.results}).
      catch(error => console.log(error));
    }

    function checkStoreState () {
      if (store.state.booksInState.length !== 0) {
        console.log('Loaded from STORE')
        bookslist.value = store.state.booksInState
        return bookslist.value
      }
      else {
        console.log('API rqst exec');
        getBooksByAPI()}
    }

    onMounted(checkStoreState)

    return {
      bookslist,
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
