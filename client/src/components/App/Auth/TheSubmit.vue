<template>
  <div class="p-3 mt-4">
    <base-input label="Name" classes="mb-6"/>
    <base-input label="Email" type="email" classes="mb-6"/>
    <base-input label="Password" type="password" classes="mb-6"/>
    <base-input label="Confirm Password" type="password"/>
      <div class="flex justify-end mt-3">
        <base-button hover bg-color="#00CEC9" color="white" class="w-full">
          <span style="font-size: 1.5rem;" class="w-full px-3 pb-1 text-xl">Sign Up</span>
        </base-button>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({

})
</script>

<style>

</style>