<template>
  <div class="relative">
    <textarea class="box"  :type="type" :rows="rows?rows:5" required></textarea>
    <span class="bar"></span>
    <label class="label">{{label}}</label>
  </div>
</template>

<script>
export default {
props: ['type','label','rows']
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
textarea {
  background: transparent;
  padding: 5px 12px;
  font-size: 1.5rem;
  width: 100%;
  z-index: 5;
  transition: all .3s;
}
textarea::-webkit-scrollbar {
  width: 2px;
}
textarea::-webkit-scrollbar-thumb{ 
  background: #777;
}
.bar{
  background: #00CEC9;
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 0px;
  height: 2px;
  transform: translateX(-50%);
  transition: all .3s;
}
textarea:focus ~ .bar,textarea:valid ~ .bar{
  width: 100%;
}
textarea:focus ~ .label,textarea:valid ~ .label {
  font-size: 12px;
  position: absolute;
  top: -16px;
  left: 3px;
}
.label{ 
  position: absolute;
  top: 3px;
  left: 12px;
  font-size: 16px;
  transition: all .3s;
  z-index: -1;
}
</style>