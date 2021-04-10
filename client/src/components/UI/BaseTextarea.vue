<template>
  <div v-if="readonly" class="relative">
    <textarea
      @input="getValue"
      class="box readonly-textarea"
      :style="{
        backgroundColor: bgColor ? bgColor : '#fff',
        color: color? color: 'black'
      }"
      :type="type ? type : 'text'"
      :rows="rows ? rows : 5"
      v-model.trim="theValue"
      readonly
      required
    ></textarea>
    <span class="bar"></span>
    <label class="readonly-label" :style="{ color: color ? color : '#777' }">{{label}}</label>
  </div>
  <div
    v-else
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      color: color ? color : '#777',
    }"
    class="relative"
  >
    <textarea
      @input="getValue"
      class="box textarea"
      :type="type ? type : 'text'"
      :rows="rows ? rows : 5"
      v-model.trim="theValue"
      required
    ></textarea>
    <span class="bar"></span>
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String },
    value: { type: String, default: "" },
    label: { type: String },
    rows: { type: String },
    type: {type:String},
    color: { type: String },
    bgColor: { type: String },
    readonly: {type:Boolean,default: false}
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
textarea::-webkit-scrollbar {
  width: 2px;
}
textarea::-webkit-scrollbar-thumb {
  background: #777;
}
.bar {
  background: #00cec9;
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 0px;
  height: 2px;
  transform: translateX(-50%);
  transition: all 0.3s;
}

div {
  @apply font-light capitalize;
  z-index: 0;
}
textarea {
  @apply font-light capitalize;
}
.textarea {
  background: transparent;
  padding: 5px 12px 6.5px 12px;
  font-size: 1.6rem;
  width: 100%;
  z-index: 5;
  transition: all 0.3s;
}
.textarea:focus ~ .bar,
.textarea:valid ~ .bar {
  width: 100%;
}
.textarea:focus ~ .label,
.textarea:valid ~ .label {
  font-size: 1.3rem;
  position: absolute;
  top: -0.8rem;
  left: 3px;
  color: #777 !important;
}
.readonly-textarea {
  background: transparent;
  padding: 5px 12px 6.5px 12px;
  font-size: 1.6rem;
  width: 100%;
  z-index: 5;
}
.readonly-label {
  position: absolute;
  font-size: 1.3rem;
  top: -0.8rem;
  left: 3px;
  transform: translateY(-50%);
  // transition: all 0.3s;
  z-index: -1;
}
.label {
  position: absolute;
  top: 22px;
  left: 12px;
  font-size: 1.7rem;
  transform: translateY(-50%);
  transition: all 0.3s;
  z-index: -1;
}
</style>
