import type { Plugin } from 'vue'
import { buildDirective as HotkeyDirective } from './directive'
import { useHotkey } from './composable'

const HotkeyPlugin: Plugin = {
  install(app, alias: Record<string, string | number> = {}) {
    app.provide('hotkey-alias', alias)
    app.directive('hotkey', HotkeyDirective(alias))
  },
}

export {
  HotkeyDirective,
  useHotkey,
}

export default HotkeyPlugin
