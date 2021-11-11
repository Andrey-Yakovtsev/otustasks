<template>
  <q-page class="flex flex-center">
    <q-card flat class="my-search">
      <Searchfield @doSearch="runSearch"/>
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
      <q-card flat style="margin: 0px; padding: 0">
      <h6 style="margin: 5px">В сторе {{store.state.booksInState.length}} книг</h6>
      <p>Жми "наполнить стор", потом поищи что-нибудь и жми "Дополнить стор"</p>
        <div class="q-pa-md q-gutter-sm">
        <q-btn style="background: #fa9f9e; color: white"
               @click="updateStore"
        >Наполнить стор</q-btn>
        <q-btn style="background: #01a86a; color: white"
               @click="addBooksToStore"
        >Дополнить стор</q-btn>
        <q-btn style="background: #fa9f9e; color: white"
               @click="addBooksToLocalStorage"
        >Сохранить в LocalStorage</q-btn>
        <q-btn style="background: #01a86a; color: white"
               @click="getBooksFromLocalStorage"
        >загрузить из  LocalStorage</q-btn>
        </div>
    </q-card>
    </q-card>


    <div v-if="searchResult.length > 0" class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="book in searchResult" :key="book.id">
        <router-link :to="{path: `/books/${book.id}`}">
          <img :src="book.formats['image/jpeg']">
        </router-link>
        <q-card-section>
          <router-link :to="{path: `/books/${book.id}`}">
            <div class="text-h6">{{book.title}}</div>
          </router-link>
          <div class="text-subtitle2">by {{book.authors.length > 0? book.authors[0].name : 'Unknown author' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Download count: {{ book.download_count}}
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn
            style="background: #4caf50; color: white" label="Удалить"
            @click="deleteBookFromList(book)">
          </q-btn>
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
// import checkStoreState from '../hooks/use-checkStoreState'

export default defineComponent({
  name: 'PageIndex',
  components: {Searchfield},

  setup () {
    const store = useStore()
    let searchResult = ref([])
    let storedBooks = ref([])
    let currentStore = ref([])
    let updatedStore = ref([])
    let query = ref('')

    function runSearch (query) {
      const words = query.split(' ')
      axios.get(`https://gutendex.com/books?search=${words[0]}%20${words[1]}`). //TODO хардкод
        then((response) => {searchResult.value = response.data.results}).
      catch(error => console.log(error));
    }
    function deleteBookFromList(book) {
      searchResult.value =  searchResult.value.filter(item => item.id !== book.id);
    }
    function findAlice () {
      runSearch ('alice wonder')
    }
    function findDickens () {
      runSearch ('dickens charles')
    }
    function getTop10Books () {
      if (store.state.booksInState.length === 0) {
        axios.get('https://gutendex.com/books/').
        then((response) => {searchResult.value = response.data.results}).
        catch(error => console.log(error));
      }
      else {return store.state.booksInState}
    }
    function updateStore () {
      store.commit('setbooksInState', searchResult.value)
      console.log('store length==>', store.state.booksInState.length)
    }
    function addBooksToStore () {
      Array.prototype.push.apply(searchResult.value, store.state.booksInState)
      store.commit('setbooksInState', searchResult.value)
    }
    function addBooksToLocalStorage () {
      localStorage.books = JSON.stringify(searchResult.value)
    }
    function getBooksFromLocalStorage () {
      searchResult.value = JSON.parse(localStorage.books)
    }

    function checkStoreState () {
    if (store.state.booksInState.length > 0) {
        console.log('Loaded from STORE')
        searchResult.value = store.state.booksInState
        return searchResult.value
      }
      else {
        console.log('API rqst exec');
        getTop10Books()}
    }

    onMounted(checkStoreState)

    return {
      store,
      storedBooks,
      currentStore,
      searchResult,
      updatedStore,
      query,
      runSearch,
      findAlice,
      findDickens,
      deleteBookFromList,
      addBooksToStore,
      updateStore,
      addBooksToLocalStorage,
      getBooksFromLocalStorage
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
