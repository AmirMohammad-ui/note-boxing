<template>
  <button
    :type="type"
    :style="{
      backgroundColor: outlined ? bgColor + '1a' : bgColor,
      '--theColor': bgColor + 'b0',
      border: outlined ? '1px solid ' + color : 'none',
      color,
    }"
    :class="[
      'flex transform space-x-2 box outlined focus:outline-none focus:scale-95',
      {
        'hover-effect': hover,
        'justify-center': textCenter,
        'justify-start': textLeft,
        'justify-end': textRight,
      },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    color: {
      type: String,
      default: "#fff",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "#404040",
    },
    hover: {
      type: Boolean,
      default: false,
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
    textLeft: {
      type: Boolean,
      default: false,
    },
    textRight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  padding: 5px 10px;
  color: white;
  border-radius: 3px;
  font-weight: lighter;
  transition: all 0.2s;
}
.hover-effect:hover {
  background-color: var(--theColor) !important;
  color: white !important;
}
</style>
