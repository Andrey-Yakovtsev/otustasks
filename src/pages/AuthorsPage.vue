<template>
  <q-page class="flex flex-center">
    <div>
      <div>
        <h3>В cторе сейчас {{store.state.booksInState.length}} книг</h3>
      </div>
      <div>
<!--        <h3>И {{authorsSet.size}} автора</h3> TODO Не понимает множества-->
      </div>

      <ol>
        <li v-for="author in authorslist">
          {{author}}
        </li>
      </ol>

    </div>
  </q-page>
</template>

<script>
import { useStore } from 'vuex';
import { ref, onMounted} from "vue";

export default {
  name: "AuthorsPage",

  setup () {
    const store = useStore()
    let bookslist = ref ([])
    let book = ref (null)
    let authorslist = ref ([])
    let authorsSet = ref (null)

    function filterAuthors () {
      bookslist.value = store.state.booksInState
      for (book of bookslist.value) {
        const name = book.authors.length > 0? book.authors[0].name : 'Unknown author'
        authorslist.value.push(name)
      }
      const authorsSet = new Set(authorslist.value)
      console.log('authorsSet==>', authorsSet)
    }

    onMounted(filterAuthors)


    return {
      book,
      authorslist,
      bookslist,
      store,
      authorsSet,
    }
  }
}

</script>

<style scoped>

</style>
