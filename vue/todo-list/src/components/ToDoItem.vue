<template>
  <div class="ToDoItem">
    <span class="ToDoItem-Text">{{item.text}}</span>
    <button class="ToDoItem-Delete" @click="deleteItem(item.id)">-</button>
  </div>
</template>

<script>
export default {
  name: "ToDoItem",
  props: ["item"],
  setup(props, { emit }) {
    function deleteItem(id) {
      emit("delete", id);
    }
    return {
      deleteItem
    };
  }
};
</script>

<style>

</style>