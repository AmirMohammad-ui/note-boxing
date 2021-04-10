<template>
  <div>
    <base-modal
      @close="$emit('close-modal')"
      :show-backdrop="isBackdropOpen"
      :show-dialog="isDialogOpen"
    >
      <div class="bg-white box">
        <header class="px-5 py-4">
          <p class="text-3xl"></p>
        </header>
        <div class="mt-4">
          <div class="p-4 pb-0">
            j
          </div>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script>
export default {
  props: ["is-backdrop-open", "is-dialog-open"],
  emits: ["close-modal"],
}
</script>

<style lang="scss" scoped>
header {
  @apply flex items-center font-light;
  background: #00cec9;
  color: #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
</style>