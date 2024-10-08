<script setup>
import { ref, computed, watchEffect } from 'vue'
import { nanoid } from 'nanoid'

import ToDoItem from './components/ToDoItem.vue'
import ToDoForm from './components/ToDoForm.vue'
import { DATA } from './data'

const STORAGE_KEY = 'tasks'

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

const storedTodos = localStorage.getItem(STORAGE_KEY)
const todos = ref(storedTodos ? JSON.parse(storedTodos) : DATA)
const visibility = ref('all')

// derived state
const filteredTodos = computed(() => filters[visibility.value](todos.value))

// handle routing
window.addEventListener('hashchange', onHashChange)
onHashChange()

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})

function handleAddToDo(toDoLabel) {
  todos.value.push({ id: 'todo-' + nanoid(), name: toDoLabel, completed: false })
}

function updateDoneStatus(toDoId) {
  const toDoToToggleStatus = todos.value.find((item) => item.id === toDoId)
  if (toDoToToggleStatus) {
    toDoToToggleStatus.completed = !toDoToToggleStatus.completed
  }
}

function deleteToDo(toDoId) {
  const itemIndex = todos.value.findIndex((item) => item.id === toDoId)
  todos.value.splice(itemIndex, 1)
}

function itemEdited(toDoId, newLabel) {
  const toDoToEdit = todos.value.find((item) => item.id === toDoId)
  if (toDoToEdit) {
    toDoToEdit.name = newLabel
  }
}

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    window.location.hash = ''
    visibility.value = 'all'
  }
}
</script>

<template>
  <div
    className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-200 via-pink-200 to-purple-300"
  >
    <h1>To-Do List</h1>
    <ToDoForm @addToDo="handleAddToDo" />
    <ul class="filters">
      <li>
        <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
      </li>
      <li>
        <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
      </li>
      <li>
        <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
      </li>
    </ul>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <ToDoItem
          :name="todo.name"
          :completed="todo.completed"
          :id="todo.id"
          @checkbox-changed="updateDoneStatus"
          @item-deleted="deleteToDo"
          @item-edited="itemEdited"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
