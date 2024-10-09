<script setup>
import { defineProps, ref, watch, useTemplateRef, onMounted } from 'vue'

const { id, name } = defineProps({
  id: String,
  name: String
})
const emit = defineEmits(['item-edited', 'edit-cancelled'])
const newName = ref(name)
const input = useTemplateRef('label-input')

onMounted(() => {
  input.value.focus()
})

watch(
  () => name,
  (newVal) => {
    newName.value = newVal
  }
)

function onSubmit() {
  emit('item-edited', newName.value)
}

function onCancel() {
  emit('edit-cancelled')
}
</script>

<template>
  <form class="flex flex-col pr-0" @submit.prevent="onSubmit">
    <div class="flex items-center hover:cursor-pointer">
      <div class="flex grow items-center justify-center p-1">
        <input
          class="grow rounded-sm p-2 focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
          :id="id"
          ref="label-input"
          type="text"
          autocomplete="off"
          v-model.lazy.trim="newName"
        />
      </div>
      <div
        class="group flex w-16 flex-col justify-center space-y-1 rounded-br-md rounded-tr-md bg-gradient-to-r from-purple-600/70 via-purple-600/85 to-purple-600 py-2"
      >
        <button
          type="button"
          class="text-xs font-medium text-white/80 hover:text-white"
          @click="onCancel"
        >
          Cancel
        </button>
        <button type="submit" class="text-xs font-medium text-white/80 hover:text-white">
          Save
        </button>
      </div>
    </div>
  </form>
</template>
