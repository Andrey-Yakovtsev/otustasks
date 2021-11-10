<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-green text-white shadow-2 rounded-borders">
      <q-toolbar-title>
        Otus Book Store
      </q-toolbar-title>
      <q-space />

      <q-tabs v-model="tab" shrink>
        <q-route-tab to="/" name="mail" label="Главная" />
<!--        <q-route-tab to="/books" name="books" label="Книги" />-->
        <q-route-tab to="/authors" name="authors" label="Авторы" />
<!--        <q-route-tab to="/addbook" name="addbook" label="Добавить книгу" />-->
<!--        <q-route-tab to="/addauthor" name="addauthor" label="Добавить автора" />-->
        <q-route-tab :to="{name:'tagspage'}" label="Добавить тэги" />
      </q-tabs>
    </q-toolbar>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "NavBar",

  setup() {
    return {
      tab: ref('')
    }
  }
}

</script>

<style scoped>

</style>
