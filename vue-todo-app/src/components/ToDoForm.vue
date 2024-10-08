<script setup>
import { ref } from 'vue'

const newToDoText = ref('')
const emit = defineEmits(['addToDo'])

function onSubmit() {
  if (newToDoText.value === '') {
    return
  }
  emit('addToDo', newToDoText.value)
  newToDoText.value = ''
}
</script>

<template>
  <form class="" @submit.prevent="onSubmit">
    <h2 class="">
      <label htmlFor="new-todo-input">ToDo List</label>
    </h2>
    <div class="">
      <input
        type="text"
        id="new-todo-input"
        class=""
        v-model="newToDoText"
        autoComplete="off"
        value=""
        onChange=""
      />
      <button type="submit" class="">Add task</button>
    </div>
  </form>
</template>

<style></style>
