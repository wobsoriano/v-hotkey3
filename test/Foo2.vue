<script setup lang="ts">
import { ref } from 'vue'
import { useHotkey } from '../src'

const visible = ref(false)

function show() {
  visible.value = true
}
function hide() {
  visible.value = false
}

const keymap = {
  enter: show,
  esc: hide,
}

useHotkey(keymap)
</script>

<template>
  <div>
    <div class="hotkey">
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
