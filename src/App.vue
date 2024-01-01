<template>
  <div class="max-w-md mx-auto mt-8 p-4 border rounded">
    <h1 class="text-2xl font-bold mb-4 text-white">Todo App</h1>
    <my-todo-app />
  </div>
</template>


<script>
import MyTodoApp from './components/TodoList.vue';

export default {
  components: {
    MyTodoApp,
  },
};
</script>
