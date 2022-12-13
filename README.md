# v-hotkey3

Vue 3.2.x directive for binding hotkeys to components.

Though not a fork, this package is a direct copy of [v-hotkey](https://github.com/Dafrok/v-hotkey) made to work with Vue 3 (until probably this [PR](https://github.com/Dafrok/v-hotkey/pull/48) gets merged).

## Install

```bash
pnpm add v-hotkey3
```

## Usage

```ts
import { createApp } from 'vue'
import HotkeyPlugin from 'v-hotkey3'

const app = createApp(App)

app.use(HotkeyPlugin)
```

```vue
<script setup>
import { computed, ref } from 'vue'

const show = ref(true)
const keymap = computed(() => ({
  // 'esc+ctrl' is OK.
  'ctrl+esc': this.toggle,
  'enter': {
    keydown: this.hide,
    keyup: this.show
  }
}))

const toggle = () => (show.value = !show.value)
const show = () => (show.value = true)
const hide = () => (show.value = false)
</script>

<template>
  <span v-show="show" v-hotkey="keymap">
    Press `ctrl + esc` to toggle me! Hold `enter` to hide me!
  </span>
</template>
```

## License

MIT
