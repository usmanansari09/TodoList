<template>
  <div class="mx-auto px-10 md:px-0 custom-cls">
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md bg-gray-800 text-white rounded p-8">
        <h1 class="text-5xl font-semibold mb-8 text-center">Task List</h1>

        <form @submit.prevent="addTodo" class="mb-8">
          <div class="flex items-center space-x-4">
            <input
              class="flex-1 border-2 outline-none py-2 px-4 shadow-md font-medium rounded border-blue-300 hover:border-blue-600 focus:border-blue-600 focus:shadow-blue-200 text-black"
              v-model="newTodo"
              placeholder="Add a new task"
            />
            <button
              class="text-white py-2 px-4 rounded bg-blue-400 hover:bg-blue-600 font-semibold"
              @click.prevent="addTodo"
            >
              Add Task
            </button>
          </div>
        </form>

        <div class="text-center">
          <div v-if="todos.length === 0" class="text-gray-400 mb-4">
            You haven't added any tasks. You can add tasks using the 'Add Task' button.
          </div>
          <div id="todoList" class="grid grid-cols-1 gap-4">
            <div
              v-for="(todo, index) in todos"
              :key="index"
              class="rounded shadow-md p-3 hover:shadow-gray-400 text-gray-300 text-lg font-semibold flex items-center justify-between"
            >
              <div class="flex items-center">
                <input
                  @click="completedTodo(todo)"
                  type="checkbox"
                  v-model="todo.complete"
                  class="mr-4"
                />
                <span :class="{ 'line-through': todo.complete }">{{ todo.text }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  class="text-white py-1 px-2 rounded bg-yellow-500 hover:bg-yellow-700 font-semibold"
                  @click="editTodoModal(index)"
                >
                  Edit
                </button>
                <button
                  class="text-white py-1 px-2 rounded bg-red-500 hover:bg-red-700 font-semibold"
                  @click="removeTodo(index)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <button
            v-if="todos.length !== 0"
            class="mt-4 text-white py-2 px-4 rounded bg-red-400 hover:bg-red-600 font-semibold"
            @click="removeAllTodos"
          >
            Remove All Tasks
          </button>
        </div>
      </div>

      <!-- Edit Todo Modal -->
      <div v-if="showEditModal" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <!-- Modal Panel -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <!-- Modal Content -->
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Todo</h3>
                  <div class="mt-2">
                    <input
                      v-model="editedTodoText"
                      class="border-2 outline-none py-2 px-4 w-full shadow-md font-medium rounded border-blue-300 hover:border-blue-600 focus:border-blue-600 focus:shadow-blue-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                @click="saveEditedTodo"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                @click="closeEditModal"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const editedTodoIndex = ref(null);
const editedTodoText = ref('');
const showEditModal = ref(false);

function editTodoModal(index) {
  editedTodoIndex.value = index;
  editedTodoText.value = todos.value[index].text;
  showEditModal.value = true;
}

function saveEditedTodo() {
  if (editedTodoIndex.value !== null) {
    todos.value[editedTodoIndex.value].text = editedTodoText.value;
    editedTodoIndex.value = null;
    editedTodoText.value = '';
    closeEditModal();
  }
}

function closeEditModal() {
  showEditModal.value = false;
}
const newTodo = ref("");
let storedTodos;
localStorage.getItem("todos")
  ? (storedTodos = JSON.parse(localStorage.getItem("todos")))
  : (storedTodos = []);

const todos = ref(storedTodos);

function addTodo() {
  if (newTodo.value !== "") {
    todos.value.push({ complete: false, text: newTodo.value });
    updateStorage();
    newTodo.value = "";
  }
}

function removeAllTodos() {
  todos.value.splice(0, todos.value.length);
  updateStorage();
}
function removeTodo(index) {
  todos.value.splice(index, 1);
  updateStorage();
}

function completedTodo(todo) {
  todo.complete = !todo.complete;
  updateStorage();
}

function updateStorage() {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
.custom-cls {
  background-color: rgb(31 41 55);
}
</style>