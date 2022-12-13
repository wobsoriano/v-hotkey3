import type { Directive, DirectiveBinding } from 'vue'
import { getKeyMap } from './keycodes'
import { assignKeyHandler } from './helpers'

interface HTMLElementWithKeyMap extends HTMLElement {
  _keyMap: Record<any, any>[]
  _keyHandler: (e: Event) => Event | undefined
}

interface SVGElementWithKeyMap extends SVGElement {
  _keyMap: Record<any, any>[]
  _keyHandler: (e: Event) => Event | undefined
}

function bindEvent(el: HTMLElementWithKeyMap | SVGElementWithKeyMap, { value, modifiers }: DirectiveBinding, alias: Record<string, Function>) {
  el._keyMap = getKeyMap(value, alias)
  el._keyHandler = e => assignKeyHandler(e, el._keyMap, modifiers)

  document.addEventListener('keydown', el._keyHandler)
  document.addEventListener('keyup', el._keyHandler)
}

function unbindEvent(el: HTMLElementWithKeyMap | SVGElementWithKeyMap) {
  document.removeEventListener('keydown', el._keyHandler)
  document.removeEventListener('keyup', el._keyHandler)
}

export function buildDirective(alias: Record<string, Function>): Directive<HTMLElementWithKeyMap | SVGElementWithKeyMap> {
  return {
    mounted(el, binding) {
      bindEvent(el, binding, alias)
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent(el)
        bindEvent(el, binding, alias)
      }
    },
    unmounted(el) {
      unbindEvent(el)
    },
  }
}
