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

    </q-card>
    <div v-if="searchResult.length > 0" class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="book in searchResult" :key="book.id">
        <router-link :to="{path: `/books/${book.id}`}">
        <img :src="`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`">
    </router-link>
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
import {defineComponent, ref} from 'vue';
import Searchfield from "components/Searchfield";
import axios from "axios";

export default defineComponent({
  name: 'PageIndex',
  components: {Searchfield},

  setup () {
    let searchResult = ref([])
    let query = ref('')

    function runSearch (query) {
      const words = query.split(' ')
      console.log('words==>', words[0], words[1])
      axios.get(`https://gutendex.com/books?search=${words[0]}%20${words[1]}`).
      then((response) => {searchResult.value = response.data.results}).
      catch(error => console.log(error));
      console.log('searchResult.value', searchResult.value)
    }
    function findAlice () {
      runSearch ('alice wonder')
    }
    function findDickens () {
      runSearch ('dickens charles')
    }

    return {
      searchResult,
      query,
      runSearch,
      findAlice,
      findDickens

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
