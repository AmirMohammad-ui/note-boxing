<template>
  <button :type="type" :style="{backgroundColor: outlined?color+'1a':color,'--theColor': color+'b0',border: outlined?'1px solid '+color:'none',color: outlined?color:'#fff'}" class="flex space-x-2 box outlined">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type:{
      type:String,
      default: "button"
    },
    color:{
      type:String,
      default: "#fff"
    },
    outlined:{
      type: Boolean,
      default: false
    },
    block: {
      type:Boolean,
      default:false
    }
  },
}
</script>
<style lang="scss" scoped>
button {
  padding: 5px 10px;
  color: white;
  border-radius: 3px;
  font-weight: lighter;
}
button:hover {
  background-color: var(--theColor) !important;
  color: white !important;
}
</style>