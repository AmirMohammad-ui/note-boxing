<template>
  <div class="container">
    <div v-if="borderLeft" class="left-border"></div>
    <div v-if="borderRight" class="right-border"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
props:{
  borderLeft: {
    type: Boolean,
    default: false
  },
  borderRight: {
    type: Boolean,
    default: false
  }
},
data(){
  return {}
}
}
</script>

<style lang="scss" scoped>
.container {
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
</style>