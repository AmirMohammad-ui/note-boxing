<template>
  <button 
    v-if="icon"
    :type="type"
    :style="{
      backgroundColor: outlined ? '#fff' : bgColor,
      '--theColor': bgColor + 'b0',
      border: outlined ? '1px solid ' + color : 'none',
      color,
      width: w?w:'3rem',
      height: w?w:'3rem',
    }"
    class="relative pb-1 icon-button box hover-effect"
    >
    <slot class="icon-position"></slot>
  </button>
  <button
    v-else
    :type="type"
    :style="{
      backgroundColor: outlined ? '#fff' : bgColor,
      '--theColor': outlined?bgColor:bgColor + 'b0',
      border: outlined ? '1px solid ' + color : 'none',
      color,
    }"
    :class="[
      'flex relative transform space-x-2 pb-1 box items-center outlined focus:outline-none focus:scale-95',
      {
        'hover-effect': hover,
        'justify-center': textCenter,
        'justify-start': textLeft,
        'justify-end': textRight,
      },
    ]"
  >
    <slot class=""></slot>
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
    icon: {
      type:Boolean,
      default: false
    },
    w:{
      type:String,
    }
  },
};
</script>
<style lang="scss" scoped>
button {
  @apply capitalize;
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
.icon-button{
  @apply flex items-center justify-center text-center relative focus:outline-none;
  border-radius: 1000px;
}
.icon-position {
  @apply absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2;
}

</style>
