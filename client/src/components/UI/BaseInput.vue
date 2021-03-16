<template>
  <div class="relative">
    <input class="box" :type="type" required>
    <span class="bar"></span>
    <label class="label">{{label}}</label>
  </div>
</template>

<script>
export default {
props: ['type','label']
}
</script>

<style lang="scss" scoped>
div {
  @apply font-light;
  background: #fff;
  margin-top: 17px;
  color: #777;
  z-index: 0;
}
input {
  background: transparent;
  padding: 5px 12px;
  font-size: 1.5rem;
  width: 100%;
  z-index: 5;
  transition: all .3s;
}
.bar{
  background: #00CEC9;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0px;
  height: 2px;
  transform: translateX(-50%);
  transition: all .3s;
}
input:focus ~ .bar,input:valid ~ .bar{
  width: 100%;
}
input:focus ~ .label,input:valid ~ .label {
  font-size: 12px;
  position: absolute;
  top: -7px;
  left: 3px;
}
.label{ 
  position: absolute;
  top: 50%;
  left: 12px;
  font-size: 16px;
  transform: translateY(-50%);
  transition: all .3s;
  z-index: -1;
}
</style>