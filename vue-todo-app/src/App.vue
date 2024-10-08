<script setup>
import { ref, watchEffect } from 'vue'
import { nanoid } from 'nanoid'
import ToDoItem from './components/ToDoItem.vue'
import ToDoForm from './components/ToDoForm.vue'
import { DATA } from './data'

const STORAGE_KEY = 'vue-tasks'
const storedTodos = localStorage.getItem(STORAGE_KEY)
const todos = ref(storedTodos ? JSON.parse(storedTodos) : DATA)

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
</script>

<template>
  <div id="app">
    <h1>To-Do List</h1>
    <ToDoForm @addToDo="handleAddToDo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
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
