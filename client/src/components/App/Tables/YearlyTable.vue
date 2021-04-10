<template>
  <div>
    <table class="w-full box">
      <tr>
        <th class="w-1/12">Years</th>
        <th>Plans</th>
      </tr>
      <tr v-for="{ y_number, y_plan, y_menu } in data" :key="y_number">
        <td class="relative">
          <div :class="{ current: y_number === currentYear }"></div>
          {{ y_number }}
        </td>
        <td class="relative">
          {{ y_plan }}
          <div class="absolute top-0 right-0">
            <div
              @click="$emit('toggle-options',y_number, 'yearly')"
              class="absolute"
              :class="{ 'info-button': !y_menu, 'info-button-close': y_menu }"
            >
              <svg v-if="!y_menu" class="" width="5" height="20" viewBox="0 0 5 20">
                <rect y="0.826782" width="3" height="3" fill="#cdcdcd" />
                <rect y="8.25244" width="3" height="3" fill="#cdcdcd" />
                <rect y="15.678" width="3" height="3" fill="#cdcdcd" />
              </svg>
              <svg v-else width="10" height="10" viewBox="0 0 22 22">
                <path
                  d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z"
                  fill="#cdcdcd"
                />
              </svg>
            </div>
            <div v-if="y_menu" class="plan-info">
              <div class="flex items-center space-x-2">
                <base-button bg-color="#777" color="#fff"
                  ><span class="pb-1 text-sm">Edit</span></base-button
                >
                <base-button bg-color="#00745D" color="#fff"
                  ><span class="pb-1 text-sm">Done</span></base-button
                >
                <base-button bg-color="#D63031" color="#fff"
                  ><span class="pb-1 text-sm">Delete</span></base-button
                >
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="month-controller">
      <base-button bg-color="#fff">
        <svg
          class="my-2"
          width="15"
          height="17"
          viewBox="0 0 15 17"
        >
          <path
            d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z"
            fill="#0984E3"
          />
        </svg>
      </base-button>
      <div class="px-5 py-3 box text-blue">
        <span class="font-light">Year: </span>
        <span class="font-bold">2021</span>
      </div>
      <base-button bg-color="#fff">
        <svg
          class="my-2"
          width="15"
          height="17"
          viewBox="0 0 15 17"
        >
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3" />
        </svg>
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    currentYear(){
      const date = new Date()
      const currentYear = date.getFullYear() 
      return currentYear
    }
  }
}
</script>

<style>

</style>