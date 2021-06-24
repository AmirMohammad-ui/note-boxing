<template>
  <div v-if="isAlertShown" class="alert-container box">
    <header :style="bgColor" class="flex items-center justify-between">
      <slot name="header"></slot>
      <base-button v-if="closeButton" @click="hideAlert" bgColor="white" 
        icon w="27px">
        <svg width="20" height="20" viewBox="0 0 22 22">
          <path
            d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z"
            :fill="error ? '#D63031': info? '#00CEC9': message? 'orange': warning? 'yellow': 'white'"
          />
        </svg>
      </base-button>
    </header>
    <div class="alert-body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    error: { type: Boolean, default: false },
    info: { type: Boolean, default: false },
    message: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
    duration: { type: Number, default: 5 },
    autoRemove: { type: Boolean, default: false},
    closeButton: { type: Boolean,default: false}
  },
  data(){
    return {
      isAlertShown: true
    }
  },
  computed: {
    bgColor(): object {
      return {
        backgroundColor: this.error
          ? "#D63031"
          : this.info
          ? "#00CEC9"
          : this.message
          ? "orange"
          : this.warning
          ? "yellow"
          : "white",
      };
    },
  },
  mounted() {
    if(this.autoRemove) {
      setTimeout(()=>{
        this.isAlertShown = false;
      },this.duration*1000);
    }
  }
});
</script>

<style lang="scss" scoped>
.alert-container {
  @apply bg-white;
  width: 30vw;
  max-width: 550px;
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 9999;
}
@media (max-width: 600px) {
  .alert-container {
    width: 90vw;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%)
  }
}
header {
  @apply text-2xl tracking-widest;
  padding: 0.5rem 1rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: white;
}
.alert-body {
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  font-weight: lighter;
  color: #777;
}
</style>
