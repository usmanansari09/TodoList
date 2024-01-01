<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-gray-900 rounded-md shadow-md">
    <div v-for="task in tasks" :key="task.id" class="flex items-center justify-between border-b p-2">
      <div @click="toggleTaskStatus(task.id)" :class="{ 'line-through': task.completed }" class="text-lg text-white">{{ task.text }}</div>
      <button @click="() => deleteTask(task.id)" class="ml-2 p-2 bg-red-500 text-white">Delete</button>
    </div>
    <div class="flex items-center mt-4">
      <input v-model="newTask" @keyup.enter="addNewTask" class="flex-grow p-2 border rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none" placeholder="Add new task" />
      <button @click="addNewTask" class="p-2 bg-green-500 text-white rounded-r-md">Add</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getTasks, addTask, deleteTask, toggleTaskStatus } from '../api';

export default {
  setup() {
    const tasks = ref([]);
    const newTask = ref('');

    const fetchTasks = () => {
      tasks.value = getTasks();
    };

    onMounted(fetchTasks);

    const addNewTask = () => {
      if (newTask.value.trim() !== '') {
        tasks.value = addTask(newTask.value);
        newTask.value = '';
      }
    };

    const removeTask = (id) => {
      tasks.value = deleteTask(id);
    };

    const toggleStatus = (id) => {
      tasks.value = toggleTaskStatus(id);
    };

    return {
      tasks,
      newTask,
      addNewTask,
      deleteTask: removeTask,
      toggleTaskStatus: toggleStatus,
    };
  },
};
</script>
