<template>
  <div class="my-container" :class="[classes,{'pl-3':borderLeft,'pr-3':borderRight}]">
    <div v-if="borderLeft" class="left-border"></div>
    <div v-if="borderRight" class="right-border"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  props:{
    borderLeft: {
      type: Boolean,
      default: false
    },
    borderRight: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String
    }
  },
  data(){
    return {}
  }
})
</script>

<style lang="scss" scoped>
.my-container {
  position: relative;
  width: 100%;
  margin: 1rem auto;
}
.left-border{
  background: #00CEC9;
  position: absolute;
  top: 0;
  left: -25px;
  width: 1rem;
  height: 100%;
  margin-left: 1rem;
  border-radius: 3px; 
}
.right-border{
  background: #00CEC9;
  position: absolute;
  top: 0;
  right: -25px;
  width: 1rem;
  height: 100%;
  margin-right: 1rem;
  border-radius: 3px; 
}
@media (min-width: 768px) {
  .my-container {
    padding: 0 2rem;
  }
  .left-border{ 
    left: -10px;
  }
  .right-border{ 
    left: -10px;
  }
}
@media (min-width: 1024px) {
  .my-container {
    padding: 0 4rem;
  }
  .left-border{ 
    left: 17px;
  }
  .right-border{ 
    left: 17px;
  }
}
</style>