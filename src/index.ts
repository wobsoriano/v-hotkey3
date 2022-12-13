import type { Plugin } from 'vue'
import { buildDirective as HotkeyDirective } from './directive'

const HotkeyPlugin: Plugin = {
  install(app, alias: Record<string, string | number> = {}) {
    app.directive('hotkey', HotkeyDirective(alias))
  },
}

export {
  HotkeyDirective,
}

export default HotkeyPlugin
