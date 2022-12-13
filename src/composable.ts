import { getCurrentInstance, inject, onMounted, onScopeDispose } from 'vue'
import { assignKeyHandler } from './helpers'
import { getKeyMap } from './keycodes'

type KeyMap = Record<string, Record<string, () => void> | (() => void)>

interface Options {
  modifier?: 'prevent' | 'stop'
  alias?: Record<string, string | number>
}

export function useHotkey(keymap: KeyMap, options: Options = {}) {
  const alias = inject('hotkey-alias') ?? (options.alias || {})

  const _keyMap = getKeyMap(keymap, alias)
  const _modifier: Record<string, boolean> = {}
  if (options.modifier)
    _modifier[options.modifier] = true

  const keyHandler = (e: Event) => assignKeyHandler(e, _keyMap, _modifier)

  onMounted(() => {
    document.addEventListener('keydown', keyHandler)
    document.addEventListener('keyup', keyHandler)
  })

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      document.removeEventListener('keydown', keyHandler)
      document.removeEventListener('keyup', keyHandler)
    })
  }
}
