<template>
  <div class="p-3">
    <base-input label="Email" classes="mb-6 mt-4" />
    <base-input label="Password" type="password" />
    <div class="flex justify-end mt-3">
      <base-button hover bg-color="#00CEC9" color="white" class="w-full">
        <span style="font-size: 1.5rem;" class="button-text">Login</span>
      </base-button>
    </div>
    <div class="go-git-container">
      <div class="w-full">
        <base-button bg-color="#c71619" color="white" class="w-full">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M19.103 7.998C19.226 8.657 19.293 9.346 19.293 10.065C19.293 15.689 15.529 19.688 9.844 19.688C8.55116 19.6884 7.2709 19.434 6.0764 18.9395C4.88189 18.4449 3.79654 17.7198 2.88236 16.8056C1.96818 15.8915 1.2431 14.8061 0.748528 13.6116C0.25396 12.4171 -0.000393722 11.1368 4.57452e-07 9.844C-0.000393722 8.55116 0.25396 7.27091 0.748528 6.0764C1.2431 4.88189 1.96818 3.79654 2.88236 2.88236C3.79654 1.96818 4.88189 1.2431 6.0764 0.748528C7.2709 0.25396 8.55116 -0.000393722 9.844 4.57452e-07C12.502 4.57452e-07 14.723 0.978001 16.427 2.566L13.652 5.341V5.334C12.619 4.35 11.308 3.845 9.844 3.845C6.596 3.845 3.956 6.589 3.956 9.838C3.956 13.086 6.596 15.836 9.844 15.836C12.791 15.836 14.797 14.151 15.209 11.837H9.844V7.998H19.104H19.103Z"
              fill="white"
            />
          </svg>
          <span class="button-text md:hidden">Sign in</span>
          <span class="hidden button-text md:block">Sign in with Google</span>
        </base-button>
      </div>
      <div class="w-full">
        <base-button bg-color="#222" color="white" class="w-full">
          <svg width="20" height="20" viewBox="0 0 19 18">
            <path
              d="M9.5 0C4.15625 0 0 4.06452 0 9.29032C0 15.3871 5.64062 18 6.53125 18C7.125 18 7.125 17.7097 7.125 17.4194V15.9677C5.04688 16.5484 4.15625 15.3871 3.85938 14.5161C3.85938 14.5161 3.85938 14.2258 3.26562 13.6452C2.96875 13.3548 1.78125 12.7742 2.96875 12.7742C3.85938 12.7742 4.45312 13.9355 4.45312 13.9355C5.34375 15.0968 6.53125 14.8065 7.125 14.5161C7.125 13.9355 7.71875 13.3548 7.71875 13.3548C5.34375 13.0645 3.5625 12.1935 3.5625 9C3.5625 7.83871 3.85938 6.96774 4.45312 6.3871C4.45312 6.3871 3.85938 5.22581 4.45312 3.77419C4.45312 3.77419 5.9375 3.77419 7.125 4.93548C8.01562 4.35484 10.9844 4.35484 11.875 4.93548C13.0625 3.77419 14.5469 3.77419 14.5469 3.77419C15.1406 5.80645 14.5469 6.3871 14.5469 6.3871C15.1406 6.96774 15.4375 7.83871 15.4375 9C15.4375 12.1935 13.3594 13.0645 11.2812 13.3548C11.5781 13.6452 11.875 14.2258 11.875 15.0968V17.4194C11.875 17.7097 11.875 18 12.4688 18C13.3594 18 19 15.3871 19 9.29032C19 4.06452 14.8438 0 9.5 0Z"
              fill="white"
            />
          </svg>
          <span class="button-text md:hidden">Sign in</span>
          <span class="hidden button-text md:block">Sign in with GitHub</span>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({})
</script>

<style scoped>
.go-git-container {
  @apply flex w-full mt-2 space-x-2;
}
.button-text {
  @apply w-full px-3 pb-1 text-lg text-center;
}
</style>
