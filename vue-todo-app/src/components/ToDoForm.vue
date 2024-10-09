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
  <form @submit.prevent="onSubmit">
    <div class="flex space-x-1 rounded-md bg-white p-1">
      <input
        type="text"
        id="new-todo-input"
        class="flex-grow rounded-sm p-2 focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
        v-model="newToDoText"
        autoComplete="off"
      />
      <button
        type="submit"
        class="rounded-md bg-purple-600 bg-gradient-to-r from-purple-600 to-purple-600 px-2 py-1.5 text-base text-white hover:from-purple-600 hover:via-purple-600 hover:to-purple-700"
      >
        Add task
      </button>
    </div>
  </form>
</template>
