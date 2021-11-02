<template>
  <q-page class="flex flex-center">
    <q-card flat class="my-search">
      <Searchfield @doSearch="runSearch"/>
    </q-card>
    <q-card flat >
      <q-card-section>
        <div>
          Store Lenght = {{store.state.booksInState.length}}
        </div>
      </q-card-section>
    </q-card>
    <q-card flat class="rounded-borders popularsearch">
      <div class="q-pa-md q-gutter-sm">
        <div>
          Popular searches:
        </div>
        <q-btn
          @click="findAlice"
          style="background: #4caf50; color: white" label="Alice in Wonderland" />
        <q-btn
          @click="findDickens"
          style="background: #4caf50; color: white" label="Books by Dickens" />
      </div>
    </q-card>
    <q-card>
      <q-card-section>
        <q-btn
          @click="putBooksToStore"
        >Put books to store</q-btn>
      </q-card-section>
    </q-card>
    <div v-if="searchResult.length > 0" class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="book in searchResult" :key="book.id">
        <router-link :to="{path: `/books/${book.id}`}">
        <img :src="book.formats['image/jpeg']">
    </router-link>
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
import {defineComponent, ref, onMounted} from 'vue';
import { useStore } from 'vuex'
import Searchfield from "components/Searchfield";
import axios from "axios";

export default defineComponent({
  name: 'PageIndex',
  components: {Searchfield},

  setup () {
    const store = useStore()
    let searchResult = ref([])
    let storedBooks = ref([])
        let query = ref('')

    function runSearch (query) {
      const words = query.split(' ')
      axios.get(`https://gutendex.com/books?search=${words[0]}%20${words[1]}`).
      then((response) => {searchResult.value = response.data.results}).
      catch(error => console.log(error));
    }
    function findAlice () {
      runSearch ('alice wonder')
    }
    function findDickens () {
      runSearch ('dickens charles')
    }
    function getTop10Books () {
      if (store.state.booksInState.length === 0) {
        console.log('STORE IS EMPTY')
      axios.get('https://gutendex.com/books/').
      then((response) => {searchResult.value = response.data.results}).
      catch(error => console.log(error));
      console.log('searchResult.value==>', searchResult.value)
    }
      else {return store.state.booksInState}
      console.log('store.state.booksInState.length ==>', store.state.booksInState.length )
    }

    function putBooksToStore (searchResult) {
      store.commit('setbooksInState', searchResult.value)
      console.log('store.state.booksInState ==>', store.state.booksInState)
    }

    onMounted(getTop10Books)

    return {
      store,
      storedBooks,
      searchResult,
      query,
      runSearch,
      findAlice,
      findDickens,
      putBooksToStore

    }
  }
})
</script>

<style lang="sass" scoped>
.my-search
  margin: 0
  width: 100%
  max-width: 800px
.popularsearch
  width: 100%
  max-width: 800px
.my-card
  width: 100%
  max-width: 250px
</style>
