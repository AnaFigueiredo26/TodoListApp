<script setup>
import { ref, computed, watchEffect, useTemplateRef } from 'vue'
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

const remainingLabel = useTemplateRef('remaining-summary')

// derived state
const filteredTodos = computed(() => filters[visibility.value](todos.value))
const remaining = computed(() => filters.active(todos.value).length)

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
  remainingLabel.value.focus()
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
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-200 via-pink-200 to-purple-300"
  >
    <div class="min-h-96 w-6/12 rounded-2xl bg-slate-50/65 px-14 py-12">
      <h2 class="mb-8 text-center text-4xl font-extrabold uppercase text-purple-950">ToDo List</h2>
      <ToDoForm @addToDo="handleAddToDo" />
      <div class="mb-2 mt-8 flex items-end justify-between px-1 text-purple-950">
        <ul class="filters flex space-x-4">
          <li>
            <a
              href="#/all"
              :class="{ 'border-b border-purple-950 font-bold': visibility === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a
              href="#/active"
              :class="{ 'border-b border-purple-950 font-bold': visibility === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ 'border-b border-purple-950 font-bold': visibility === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <span id="list-heading" class="text-xs font-medium" tabIndex="-1" ref="remaining-summary">
          {{ remaining }}
          <span>{{ remaining === 1 ? ' task' : ' tasks' }} remaining</span>
        </span>
      </div>
      <ul class="mt-4 flex h-[244px] flex-col space-y-3 overflow-auto">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="relative rounded-md bg-white"
          :class="{ 'opacity-70': todo.completed }"
        >
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
  </div>
</template>
