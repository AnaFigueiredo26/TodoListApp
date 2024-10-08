<script setup>
import ToDoItemEditForm from './ToDoItemEditForm.vue'
import { ref, defineEmits, defineProps } from 'vue'

//id, name, completed, toggleTaskCompleted, deleteTask, editTask
const { id, name, completed } = defineProps({
  id: String,
  name: String,
  completed: Boolean
})

const emit = defineEmits(['item-deleted', 'checkbox-changed', 'item-edited'])

const isEditing = ref(false)

function deleteToDo() {
  emit('item-deleted', id)
}

function toggleToItemEditForm() {
  isEditing.value = !isEditing.value
}

function itemEdited(newLabel) {
  emit('item-edited', id, newLabel)
  isEditing.value = false
}

function editCancelled() {
  isEditing.value = false
}

function checkboxChanged() {
  emit('checkbox-changed', id)
}
</script>

<template>
  <div v-if="!isEditing">
    <div>
      <input type="checkbox" :id="id" :checked="completed" @change="checkboxChanged" />
      <label :for="id">{{ name }}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn" @click="toggleToItemEditForm">Edit</button>
      <button type="button" class="btn btn__danger" @click="deleteToDo">Delete</button>
    </div>
  </div>
  <ToDoItemEditForm
    v-else
    :id="id"
    :name="name"
    @item-edited="itemEdited"
    @edit-cancelled="editCancelled"
  />
</template>
