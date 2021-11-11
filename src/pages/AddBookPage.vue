<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="bookTitle"
        label="Название книги"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="authorName"
        label="Имя автора"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="authorBirth"
        label="Год рождения автора"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="authorDeath"
        label="Год смерти автора"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="downloadsCount"
        label="Количество скачиваний"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />



      <div>
        <q-btn label="Сохранить" type="submit" color="primary"/>
        <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: "AddBookPage",
  setup () {
    const store = useStore()
    const $q = useQuasar()

    const newBook = ref({})
    const bookTitle = ref(null)
    const authorName = ref(null)
    const authorBirth = ref(null)
    const authorDeath = ref(null)
    const downloadsCount = ref(null)


    return {
      newBook,
      downloadsCount,
      authorDeath,
      authorBirth,
      authorName,
      bookTitle,

      onSubmit () {
        newBook.value = {
          downloadsCount:  downloadsCount,
          authorDeath: authorDeath,
          authorBirth: authorBirth,
          authorName: authorName,
          bookTitle: bookTitle
        }
        console.log('BOOK ==>', newBook.value)
        store.state.booksInState.push(newBook.value);
        console.log('STORE ==>', store.state.booksInState)
      },
      onReset () {
        newBook.value = {}
        downloadsCount.value = null
        authorDeath.value = null
        authorBirth.value = null
        authorName.value = null
        bookTitle.value = null

      }
    }
  }
}
</script>

<style scoped>

</style>
