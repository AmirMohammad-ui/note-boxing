<template>
  <div 
    v-if="readonly" 
    class="relative"
    :style="{
      backgroundColor: bgColor?bgColor:'#fff',
    }">
    <input
      class="box readonly-input"
      :type="type ? type : 'text'"
      :readonly="readonly"
      @input="getValue"
      :style="{color: color?color:'#777'}"
      v-model.trim="theValue"
    />
    <span class="bar"></span>
    <label style="color: #777;" class="readonly-label">{{ label }}</label>
  </div>
  <div 
    v-else 
    class="relative"
    :style="{
      backgroundColor: bgColor?bgColor:'#fff',
      color: color?color:'#777'
    }">
    <input
      class="box input"
      :type="type ? type : 'text'"
      @input="getValue"
      v-model.trim="theValue"
      required
    />
    <span class="bar"></span>
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    readonly: { type: Boolean, default: false },
    modelValue: { type: String },
    label: {type: String,required:true},
    type: {type:String},
    value: {type:String,default: ''},
    bgColor: {type:String},
    color: {type:String}
  },
  emits: ["update:modelValue"],
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {
    getValue() {
      this.$emit("update:modelValue", this.theValue);
    },
  },
};
</script>

<style lang="scss" scoped>

div {
  @apply font-light;
  margin-top: 1.7rem;
  z-index: 0;
}
input {
  @apply font-light;
}
.input {
  background: transparent;
  padding: 5px 12px 6.5px 12px;
  font-size: 1.6rem;
  width: 100%;
  z-index: 5;
  transition: all 0.3s;
}
.bar {
  background: #00cec9;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0px;
  height: 2px;
  transform: translateX(-50%);
  transition: all 0.3s;
}
.input:focus ~ .bar,
.input:valid ~ .bar {
  width: 100%;
}
.input:focus ~ .label,
.input:valid ~ .label {
  font-size: 1.3rem;
  position: absolute;
  top: -.8rem;
  left: 3px;
  color: #777 !important;
}
.readonly-input {
  background: transparent;
  padding: 5px 12px 6.5px 12px;
  font-size: 1.6rem;
  width: 100%;
  z-index: 5;
}
.readonly-label {
  position: absolute;
  font-size: 1.3rem;
  top: -.8rem;
  left: 3px;
  transform: translateY(-50%);
  // transition: all 0.3s;
  z-index: -1;
}  
.label {
  position: absolute;
  top: 50%;
  left: 12px;
  font-size: 1.7rem;
  transform: translateY(-50%);
  transition: all 0.3s;
  z-index: -1;
}
</style>
