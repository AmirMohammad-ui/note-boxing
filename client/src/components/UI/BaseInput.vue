<template>
  <div
    v-if="readonly"
    class="relative"
    :class="classes"
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      zIndex: zIndex ? zIndex : 10,
    }"
  >
    <input
      class="box readonly-input"
      :class="inputClasses"
      :type="type ? type : 'text'"
      :readonly="readonly"
      @input="getValue"
      :style="{ color: color ? color : '#777' }"
      v-model.trim="theValue"
    />
    <span class="bar"></span>
    <label style="color: #777" class="readonly-label">{{ label }}</label>
  </div>
  <div
    v-else-if="type === 'date'"
    class="relative"
    :class="classes"
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      zIndex: zIndex ? zIndex : 10,
    }"
  >
    <input
      ref="theInput"
      class="box readonly-input"
      :class="inputClasses"
      :type="type ? type : 'text'"
      @input="getValue"
      :style="{ color: color ? color : '#777' }"
      v-model.trim="theValue"
    />
    <span class="bar"></span>
    <label style="color: #777" class="readonly-label">{{ label }}</label>
  </div>
  <div
    v-else-if="type === 'file'"
    class="relative flex w-full space-x-4"
    :class="classes"
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      zIndex: zIndex ? zIndex : 10,
    }"
  >
    <input
      class=""
      :class="inputClasses"
      type="file"
      ref="fileInput"
      hidden
      :multiple="multipleFile ? true : false"
      @change="getFile"
    />
    <div :style="{ color: color ? color : '#777',fontSize: '1.5rem' }" class="box readonly-input">
      {{ fileName }}
    </div>
    <base-button
      @click="openTheFileSelection"
      class="w-1/5"
      bg-color="#00CEC9"
      color="#fff"
    >
      <span class="pb-1 mx-auto text-2xl">{{ fileButtonName }}</span>
    </base-button>
    <label
      :style="{
        color: '#777',
        left: fileName !== ''?'-8px':'0px',
        top: fileName !== '' ? '-.7rem' : '50%',
        fontSize: fileName !== '' ? '1.1rem' : '1.7rem',
      }"
      class="label"
      >{{ label }}</label
    >
  </div>
  <div
    v-else-if="type === 'options'"
    class="relative box input multichoice"
    :class="classes"
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      color: color ? color : '#777',
      zIndex: zIndex ? zIndex : 10,
    }"
  >
    <div v-if="options.length > 0" class="w-full h-full" @click="showOptions">
      <svg
        class="float-right mt-3"
        width="13"
        height="10"
        viewBox="0 0 13 10"
      >
        <path d="M6.5 10L0.870835 0.25L12.1292 0.250001L6.5 10Z" fill="#777777" />
      </svg>
    </div>
    <div v-if="isOptionsVisible" class="options box">
      <div
        class="capitalize option"
        v-for="option in options"
        :value="option"
        :key="option"
        @click="selectedOption(option)"
      >
        {{ option }}
      </div>
    </div>
    <label class="capitalize label multichoice-label">{{
      label
    }}</label>
    <span class="capitalize label">{{options.length > 0 ? selectedValue:"No category created."}}</span>
    <div
      v-if="isOptionsBackdropActive"
      @click="deactivateBackdrop"
      class="options-backdrop"
    ></div>
  </div>
  <div
    v-else
    class="relative"
    :class="classes"
    :style="{
      backgroundColor: bgColor ? bgColor : '#fff',
      color: color ? color : '#777',
      zIndex: zIndex ? zIndex : 10,
    }"
  >
    <input
      class="box input"
      :class="inputClasses"
      ref="theInput"
      :type="type ? type : 'text'"
      @input="getValue"
      v-model.trim="theValue"
      required
    />
    <span class="bar"></span>
    <label class="label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  props: {
    focusOn: { type: Boolean, default: false},
    readonly: { type: Boolean, default: false },
    modelValue: { type: String },
    label: { type: String },
    type: { type: String },
    value: { type: String, default: "" },
    bgColor: { type: String },
    color: { type: String },
    options: {
      type: Array,
      default() {
        return ["No Option Is Set Yet."];
      },
    },
    zIndex: { type: Number },
    multipleFile: { type: Boolean },
    fileButtonName: { type: String, default: "Pick" },
    classes: {type:String},
    inputClasses: {type:String}
  },
  emits: ["update:modelValue","get-file"],
  data() {
    return {
      theValue: this.value,
      isOptionsVisible: false,
      isOptionsBackdropActive: false,
      theFile: null,
      selectedValue: this.options.length > 0 ? this.options[0]:'',
      fileName: "",
      isFocused: this.focusOn
    };
  },
  methods: {
    deactivateBackdrop(){
      this.isOptionsVisible = false;
      this.isOptionsBackdropActive = false;
      this.$emit("update:modelValue", '');
    },
    openTheFileSelection() {
      const actualInput = this.$refs.fileInput as HTMLInputElement;
      actualInput.click();
    },
    getFile(e:any) {
      this.$emit("get-file", e.target.files);
      this.fileName = e.target.files.length > 1 ? `${e.target.files[0].name} and ${e.target.files.length-1} more`:e.target.files[0].name
    },
    getValue() {
      this.$emit("update:modelValue", this.theValue);
    },
    selectedOption(val:string) {
      this.selectedValue = val;
      this.$emit("update:modelValue", val);
      this.isOptionsVisible = false;
      this.isOptionsBackdropActive = false;
    },
    showOptions() {
      this.isOptionsVisible = true;
      this.isOptionsBackdropActive = true;
    },
  },
  mounted() {
    if(this.selectedValue) {
      this.$emit("update:modelValue", this.selectedValue);
    }
    if(this.isFocused) {
      const inputEl = this.$refs.theInput as HTMLInputElement;
      inputEl.focus();
    }
  }
});
</script>

<style lang="scss" scoped>
.option {
  padding: 5px 10px;
  &:hover {
    background: #cdcdcda9;
    color: #404040;
  }
}
.options-backdrop {
  @apply fixed top-0 left-0 w-full h-full;
  z-index: 0;
}
.options {
  background: #fff;
  padding: 5px 0;
  position: absolute;
  top: 0;
  left: -4px;
  width: 102%;
  z-index: 20;
}
.multichoice:nth-child(2) {
  z-index: 10 !important;
}
.multichoice-label {
  font-size: 1.1rem !important;
  position: absolute !important;
  top: -0.7rem !important;
  left: 3px !important;
  color: #777 !important;
}
.dropdown-arrow {
  position: absolute;
  top: 0;
  right: 0;
  // transform: translateY(-50%)
}
div {
  @apply font-light;
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
  transition: all 0.3s;
  z-index: 5;
}
.file-input {
  padding: 5px 12px 6.5px 12px;
  font-size: 1.6rem;
  width: 100%;
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
  font-size: 1.1rem;
  position: absolute;
  top: -0.7rem;
  left: 3px;
  color: #777 !important;
}
.readonly-input {
  background: transparent;
  padding: 5px 12px 6.5px 12px;
  width: 100%;
  z-index: 5;
}
.readonly-label {
  position: absolute;
  font-size: 1.1rem;
  top: -0.7rem;
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
input[type="date"]::-webkit-calendar-picker-indicator:focus {
  border: none;
  outline: none;
}
</style>
