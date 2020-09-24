<template>
  <div class="ToDo">
    <h1 class="ToDo-Header">
      {{ timeString }}
    </h1>
    <div class="ToDo-Container">
      <div class="ToDo-Content">
        <ToDoItem v-for="item in list" :item="item" @delete="onDeleteItem" :key="item.id" />
      </div>
      <div class="ToDoInput">
        <input
          type="text"
          placeholder="I need to..."
          v-model="todo"
          v-on:keyup.enter="createNewToDoItem"
        />
        <button class="ToDo-Add" @click="createNewToDoItem">+</button>
      </div>
      <div class="ToDo-ErrorContainer">
        <p v-if="showError">Please enter a todo!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ToDoItem from "./ToDoItem.vue";
import useTime from './Clock';
import Logo from "../assets/logo.png";
export default {
  name: "ToDo",
  components: {
    ToDoItem
  },
  setup() {
    const list = ref([
      { id: 1, text: "clean the house" },
      { id: 2, text: "buy milk" }
    ]);
    const { timeString } = useTime();
    console.log(timeString);
    const todo = ref("");
    const logo = Logo;
    const showError = ref(false);
    function generateId() {
      if (list.value && list.value.length) {
        return Math.max(...list.value.map(t => t.id)) + 1;
      } else {
        return 1;
      }
    }
    function createNewToDoItem() {
      //validate todo
      if (!todo.value) {
        this.displayError();
        return;
      }
      const newId = generateId();
      list.value.push({ id: newId, text: todo.value });
      todo.value = "";
    }
    function onDeleteItem(id) {
      list.value = list.value.filter(item => item.id !== id);
    }
    function displayError() {
      showError.value = true;
      const clearTimer = setTimeout(() => (showError.value = false), 3000);
      return () => clearTimeout(clearTimer);
    }
    return {
      timeString,
      list,
      todo,
      logo,
      showError,
      generateId,
      createNewToDoItem,
      onDeleteItem,
      displayError
    };
  }
};
</script>

<style>
</style>