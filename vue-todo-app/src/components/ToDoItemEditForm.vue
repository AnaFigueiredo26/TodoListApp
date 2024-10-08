<script setup>
import { defineProps, ref, watch } from 'vue'

const { id, name } = defineProps({
  id: String,
  name: String
})
const emit = defineEmits(['item-edited', 'edit-cancelled'])
const newName = ref(name)

watch(
  () => name,
  (newVal) => {
    newName.value = newVal // Update newName if the prop changes
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
  <form class="" @submit.prevent="onSubmit">
    <div>
      <label class="">Edit Name for &quot;{{ name }}&quot;</label>
      <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newName" />
    </div>
    <div class="btn-group">
      <button type="button" class="" @click="onCancel">Cancel</button>
      <button type="submit" class="btn btn__primary">Save</button>
    </div>
  </form>
</template>

<style scoped></style>
