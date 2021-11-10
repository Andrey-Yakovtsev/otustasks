<template>
  <q-page class="q-gutter-md">
    <q-card>
    <q-card-section>Добавить тэг в стор:</q-card-section>
      <q-card-section>
        <q-input style="max-width: 300px" v-model="tag"></q-input>
      </q-card-section>
    <q-card-section>
    <q-btn style="background: #4caf50; color: white"
           @click="addNewTagtoStore">Добавить</q-btn>
      </q-card-section>
      </q-card>
    <q-card flat>
      <q-card-section>
        <h6>Список Тэгов в сторе = {{store.state.tags.length}} </h6>
      </q-card-section>
      </q-card>
    <ul v-for="tag in store.state.tags">
      <li>
        <q-item >{{tag}}</q-item>
      </li>
    </ul>
  </q-page>
</template>

<script>
import { ref, onMounted} from 'vue';
import { useStore } from 'vuex'

export default {
  name: "AddBookPage",
  setup() {

    let tag = ref('')
    let tags = ref(['Драма','Спорт','Наука','Фантастика','Триллер'])
    const store = useStore()


    function addTagtoStore () {
      store.commit('settags', tags.value )
    }
    function addNewTagtoStore () {
      store.commit('settags', Array(tag.value))
      tag.value=''
    }

    onMounted (addTagtoStore)

    return {
      tag,
      tags,
      store,
      addNewTagtoStore

    }
  }
}
</script>

<style scoped>

</style>
