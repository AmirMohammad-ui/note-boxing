<template>
  <div>
    <base-modal
      @close="$emit('close-modal')"
      :show-backdrop="isBackdropOpen"
      :show-dialog="isDialogOpen">
      <div class="bg-white auth-container box">
        <div class="w-full p-5 sm:w-1/2">
          <img class="p-16" src="../../../assets/login.svg" alt="">
        </div>
        <div class="w-full p-2 sm:w-1/2">
          <div class="tabs">
            <div class="tab_container">
              <button @click="openTab('login')" class="px-4 tab" :class="{'current-opentab show-bar':currentOpenTab === 'login'? true:false}">
                Login
              <span class="bar show-bar"></span>
              </button>
            </div>
            <div class="tab_container">
              <button @click="openTab('submit')" class="px-3 tab" :class="{'current-opentab show-bar':currentOpenTab === 'submit'? true:false}">
                Sign Up
              <span class="bar show-bar"></span>
              </button>
            </div>
          </div>
          <keep-alive>
            <component :is="activeComponent"></component>
          </keep-alive>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import TheLogin from "./TheLogin.vue"
import TheSubmit from "./TheSubmit.vue"
import {defineComponent} from "vue"
export default defineComponent({
  components: {TheLogin,TheSubmit},
  props: ["is-backdrop-open", "is-dialog-open"],
  emits: ["close-modal"],
  data() {
    return {
      currentOpenTab: 'login'
    }
  },
  computed: {
    activeComponent() {
      return `the-${this.currentOpenTab}`
    }
  },
  methods: {
    openTab(tab) {
      this.currentOpenTab = tab
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
}
@media (max-width: 640px) {
  .auth-container {
    display: flex;
    flex-direction: column;
  }
}
.current-opentab {
  background: #b3e4e9;
  color: #438a84;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  .show-bar {
    transform: translateX(0);
  }
}
.tabs {
  @apply flex px-6 pt-4 space-x-4 text-lg;
  color: #777;
}
.tab_container {
  @apply overflow-hidden relative;
}
.tab {
  @apply py-2 font-light border-none outline-none focus:outline-none;
}
.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #438a84;
  transform: translateX(-100%);
}
img {
  width: 100%;
  height: 100%;
}
header {
  @apply flex items-center font-light;
  background: #00cec9;
  color: #fff;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
</style>