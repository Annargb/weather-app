import Vue, { DirectiveBinding } from "vue";

interface ClickOutsideEl extends HTMLElement {
  __clickOutsideHandler__?: (e: MouseEvent) => void;
}

type ClickOutsideHandler = (e: MouseEvent) => void;

Vue.directive("click-outside", {
  bind(el: ClickOutsideEl, binding: DirectiveBinding<ClickOutsideHandler>) {
    const handler: ClickOutsideHandler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    el.__clickOutsideHandler__ = handler;
    document.addEventListener("click", handler);
  },

  unbind(el: ClickOutsideEl) {
    if (el.__clickOutsideHandler__) {
      document.removeEventListener("click", el.__clickOutsideHandler__);
    }
  },
});
