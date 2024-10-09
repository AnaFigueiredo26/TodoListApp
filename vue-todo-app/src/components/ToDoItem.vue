<script setup>
import ToDoItemEditForm from './ToDoItemEditForm.vue'
import { ref, defineEmits, defineProps } from 'vue'

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
  <div class="flex flex-col pr-0" v-if="!isEditing">
    <div class="flex items-center hover:cursor-pointer">
      <div class="flex grow items-center justify-center space-x-1.5 px-3">
        <input
          type="checkbox"
          class="h-4 w-4 hover:cursor-pointer"
          :id="id"
          :checked="completed"
          @change="checkboxChanged"
        />
        <label class="grow text-sm font-medium text-purple-950 hover:cursor-pointer" :for="id">{{
          name
        }}</label>
      </div>
      <div
        class="group flex w-1.5 flex-col justify-center space-y-1 overflow-hidden rounded-br-md rounded-tr-md bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600 py-2 transition-all ease-in-out hover:w-16"
      >
        <button
          type="button"
          class="text-xs font-medium text-white/75 opacity-0 hover:text-white group-hover:opacity-100"
          @click="toggleToItemEditForm"
        >
          Edit
        </button>
        <button
          type="button"
          class="text-xs font-medium text-white/75 opacity-0 hover:text-white group-hover:opacity-100"
          @click="deleteToDo"
        >
          Delete
        </button>
      </div>
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
