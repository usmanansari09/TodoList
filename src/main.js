import { createApp } from 'vue';
import App from './App.vue';
import  '../src/tailwind.css';
import './index.css'
const app = createApp(App);

app.component('my-todo-app', App);

app.mount('#app');
