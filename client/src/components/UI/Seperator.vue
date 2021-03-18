<template>
  <div>
    <div
      :class="[
        'seperator',
      ]"
    >
      <div v-if="right" class="mr-4 seperator-right"><slot name="right"></slot></div>
      <div v-if="center" class="seperator-center"><slot name="center"></slot></div>
      <div v-if="left" class="ml-4 seperator-left"><slot name="left"></slot></div>
      <div class="seperator-divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    right: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.seperator {
  @apply relative flex justify-between items-center w-full;
}
.seperator-divider {
  position: absolute;
  top: 55%;
  left: 0;
  background: #777;
  height: 1px;
  width: 100%;
  z-index: -1;
}
.seperator-right {
  background: #f5f6fa;
  color: #777;
  font-size: 2rem;
  padding: 0 10px;
}
.seperator-left {
  background: #f5f6fa;
  color: #777;
  font-size: 2rem;
  padding: 0 10px;
}
.seperator-center {
  background: #f5f6fa;
  color: #777;
  font-size: 2rem;
  padding: 0 10px;
}
</style>
