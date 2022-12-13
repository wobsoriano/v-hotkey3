<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function show() {
  visible.value = true
}
function hide() {
  visible.value = false
}
</script>

<template>
  <div>
    <div v-hotkey="{ enter: show, esc: hide }" class="hotkey">
      Toggle
    </div>
    <div
      v-if="visible"
      class="visible"
    >
      Hello hotkey
    </div>
  </div>
</template>
