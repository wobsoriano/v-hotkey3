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
import { ref } from 'vue'

const show = ref(true)

const toggle = () => (show.value = !show.value)
const show = () => (show.value = true)
const hide = () => (show.value = false)

const keymap = {
  // 'esc+ctrl' is OK.
  'ctrl+esc': toggle,
  'enter': {
    keydown: hide,
    keyup: show
  }
}
</script>

<template>
  <span v-show="show" v-hotkey="keymap">
    Press `ctrl + esc` to toggle me! Hold `enter` to hide me!
  </span>
</template>
```

## Event Handler

- keydown (as default) 
- keyup

## Key Combination

Use one or more of following keys to fire your hotkeys.

- ctrl
- alt
- shift
- command (MacOS)
- windows (Windows)

## Modifiers

### prevent

Add the prevent modifier to the directive to prevent default browser behavior.

```vue
<template>
  <span v-show="show" v-hotkey.prevent="keymap">
    Press `ctrl + esc` to toggle me! Hold `enter` to hide me!
  </span>
</template>
```

### stop

Add the stop modifier to the directive to stop event propagation.

```vue
<template>
  <div v-hotkey.stop="keymap">
    <span> Enter characters in editable areas doesn't trigger any hotkeys. </span>
    <input>
  </div>
</template>
```

## Key Code Alias

The default key code map is based on US standard keyboard.
This ability to provide their own key code alias for developers who using keyboards with different layouts. The alias name must be a **single character**.

### Definition

```ts
import { createApp } from 'vue'
import HotkeyPlugin from 'v-hotkey3'

const app = createApp(App)

app.use(HotkeyPlugin, {
  '①': 49 // the key code of character '1'
})
```

### Template

```vue
<script setup>
import { computed } from 'vue'

function foo() {
  console.log('Hooray!')
}

const keymap = {
  '①': foo
}
</script>

<template>
  <span v-hotkey="keymap" />
</template>
```

## License

MIT
