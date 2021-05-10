<template>
  <teleport to="body">
    <div class="fixed top-0 left-0 base-modal">
      <transition name="backdrop">
      <div
        v-if="showBackdrop"
        @click="$emit('close')"
        class="fixed top-0 left-0 w-full h-full backdrop"
      ></div>
      </transition>
      <transition name="dialog">
      <dialog v-if="showDialog" open>
        <slot></slot>
      </dialog>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent ({
  props: ['show-backdrop','show-dialog'],
  emits: ['close']
});
</script>

<style lang="scss" scoped>
// .backdrop-enter-active {}
// .backdrop-enter-from,.backdrop-leave-to {}
// .backdrop-leave-from,.backdrop-enter-to {}

// .dialog-enter-active {}
// .dialog-enter-from,.dialog-leave-to {}
// .dialog-leave-from,.dialog-enter-to {}
.base-modal {
  z-index: 20;
}
dialog {
  position: fixed;
  width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  z-index: 5;
}
</style>
