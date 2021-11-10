<template>
  <div class="row">
    <div class="col-4">
      <!--      <q-img width="200px"-->
      <!--             :src="book['formats']['image/jpeg']"-->
      <!--      >-->
      <!--      </q-img>-->
    </div>
    <div class="col-8">
      <p><strong>Book ID:</strong> {{book['id']}}</p>
      <p><strong>Book Title:</strong> {{book['title']}}</p>
      <p><strong>Book Authors:</strong> {{book['authors']}}</p>
<!--      <p><strong>Book Tags:</strong> {{book['tags']}}</p>-->
      <p><strong>Book Tags:</strong> {{tags}}</p>
      <!--          <p>Book Authors {{book['authors'][0].name}}</p>-->
    </div>
    <div class="q-pa-md" style="max-width: 300px">
      <div class="q-gutter-md">
        <q-select multiple v-model="selectedTags" :options="$store.state.tags" label="Выбрать тэги" />
        <q-btn style="background: #4caf50; color: white"
               @click="onItemClick">Attach tags to this book</q-btn>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import axios from "axios";
export default {
  name: "SingleBookPage",
  setup() {
    const store = useStore()
    const route = useRoute()
    const book = ref ({})
    const tags = ref (null)
    const selectedTags = ref(null)


    function getBook () {
      axios.get(`https://gutendex.com/books/${route.params.id}`).
      then((response) => {
        book.value = response.data;
        console.log('response.data', response.data)
      }).
      catch(error => console.log(error));
    }

    function onItemClick () {
      // console.log(selectedTags)
      tags.value = selectedTags.value
      // console.log(book.tags)
    }


    onMounted (getBook)

    return {
      book,
      selectedTags,
      tags,
      onItemClick
    }
  }
}

</script>

<style scoped>

</style>
