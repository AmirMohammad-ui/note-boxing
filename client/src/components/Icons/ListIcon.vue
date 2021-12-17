<template>
                <svg class="icon" width="13" height="14" viewBox="0 0 13 14">
                  <path
                    d="M0.5 0H12.5V2H0.5V0ZM1.5 6H11.5V8H1.5V6ZM0 12H13V14H0"
                    :fill="color"
                  />
                </svg>
</template>
<script lang="ts">
import * as vue from 'vue'
export default vue.defineComponent({
  props: {
    color: {
      type: String,
      default: "#777777"
    },
  }
})
</script>
