<template>
  <div :class="classes">
    <container :style="containerStyle">
      <slot>
        <seperator class="lg:hidden" left right>
          <template #left>
            {{ leftSeperatorText }}
          </template>
          <template #right>
            {{ rightSeperatorText }}
          </template>
        </seperator>
        <seperator class="hidden lg:flex" right center left>
          <template #left
            ><span class="font-extrabold">{{ leftSeperatorText }}</span></template
          >
          <template #right>
            <div class="flex items-center space-x-2">
              <base-button @click="editPlan(currentPlanId)" icon bg-color="white">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12">
                  <path
                    d="M9.96401 0C9.4473 0 8.93059 0.200514 8.52956 0.601542L0.724936 8.40617L0.694087 8.56041L0.154242 11.2751L0 12L0.724936 11.8458L3.43959 11.3059L3.59383 11.2751L11.3985 3.47044C12.2005 2.66838 12.2005 1.4036 11.3985 0.601542C10.9974 0.200514 10.4807 0 9.96401 0ZM9.96401 0.940874C10.2127 0.940874 10.4634 1.05463 10.7044 1.29563C11.1844 1.77571 11.1844 2.29627 10.7044 2.77635L10.3496 3.11568L8.88432 1.65039L9.22365 1.29563C9.46465 1.05463 9.7153 0.940874 9.96401 0.940874ZM8.19023 2.34447L9.65553 3.80977L3.68638 9.77892C3.36247 9.14653 2.85347 8.63753 2.22108 8.31363L8.19023 2.34447ZM1.58869 9.11568C2.18059 9.35476 2.64524 9.81941 2.88432 10.4113L1.26478 10.7352L1.58869 9.11568Z"
                    fill="#777777"
                  />
                </svg>
              </base-button>
              <base-button @click="finishedPlan(currentPlanId)" icon bg-color="#00745D">
                <svg width="1.6rem" viewBox="0 0 13 8">
                  <path
                    d="M12.4651 0.000193121C12.3302 0.00363171 12.2021 0.0518623 12.108 0.134667L4.16345 6.92777L0.894313 4.13244C0.846444 4.08981 0.789108 4.05578 0.725664 4.03233C0.662219 4.00888 0.593941 3.9965 0.524828 3.9959C0.455715 3.99529 0.387156 4.00649 0.323166 4.02883C0.259177 4.05117 0.201043 4.0842 0.15217 4.12599C0.103297 4.16778 0.0646674 4.21749 0.0385427 4.2722C0.012418 4.32692 -0.000676275 4.38554 2.68896e-05 4.44463C0.000730055 4.50373 0.0152165 4.56211 0.0426377 4.61636C0.070059 4.67061 0.109864 4.71964 0.159721 4.76057L3.79615 7.86995C3.89358 7.95322 4.02569 8 4.16345 8C4.3012 8 4.43332 7.95322 4.53074 7.86995L12.8426 0.76279C12.9177 0.700397 12.9689 0.620068 12.9897 0.53233C13.0104 0.444592 12.9997 0.353539 12.9589 0.271102C12.9181 0.188665 12.8491 0.118691 12.761 0.0703496C12.6729 0.0220081 12.5698 -0.00244557 12.4651 0.000193121Z"
                    fill="white"
                  />
                </svg>
              </base-button>
              <base-button @click="deletePlan(currentPlanId)" icon bg-color="#D63031">
                <svg width="1.5rem" height="1.7rem" viewBox="0 0 10 11">
                  <path
                    d="M4.9922 5.70625e-05C4.85995 0.00199399 4.73392 0.0530134 4.64178 0.141918C4.54963 0.230823 4.4989 0.350349 4.50071 0.474263V0.708169L1.75462 0.708169C1.68848 0.707328 1.62283 0.718807 1.56146 0.741939C1.5001 0.765071 1.44425 0.799396 1.39717 0.842919C1.35008 0.886443 1.31269 0.938298 1.28717 0.995474C1.26165 1.05265 1.24851 1.11401 1.24851 1.17598L0.5064 1.17598C0.440238 1.1751 0.374551 1.18656 0.313154 1.20967C0.251757 1.23279 0.195876 1.26711 0.148759 1.31063C0.101641 1.35416 0.0642259 1.40603 0.0386884 1.46322C0.0131509 1.52041 0 1.58179 0 1.64379C0 1.70579 0.0131509 1.76716 0.0386884 1.82436C0.0642259 1.88155 0.101641 1.93342 0.148759 1.97695C0.195876 2.02047 0.251757 2.05479 0.313154 2.07791C0.374551 2.10102 0.440238 2.11248 0.5064 2.1116L9.4936 2.1116C9.55976 2.11248 9.62545 2.10102 9.68685 2.07791C9.74824 2.05479 9.80412 2.02047 9.85124 1.97695C9.89836 1.93342 9.93577 1.88155 9.96131 1.82436C9.98685 1.76716 10 1.70579 10 1.64379C10 1.58179 9.98685 1.52041 9.96131 1.46322C9.93577 1.40603 9.89836 1.35416 9.85124 1.31063C9.80412 1.26711 9.74824 1.23279 9.68685 1.20967C9.62545 1.18656 9.55976 1.1751 9.4936 1.17598L8.75149 1.17598C8.75149 1.11401 8.73835 1.05265 8.71283 0.995474C8.68731 0.938298 8.64992 0.886443 8.60283 0.842919C8.55575 0.799396 8.4999 0.765071 8.43854 0.741939C8.37717 0.718807 8.31152 0.707328 8.24538 0.708169L5.49929 0.708169V0.474263C5.5002 0.411675 5.48771 0.349552 5.46253 0.291571C5.43736 0.23359 5.40003 0.180932 5.35274 0.136714C5.30546 0.092496 5.24919 0.0576175 5.18726 0.0341441C5.12533 0.0106706 5.059 -0.000920479 4.9922 5.70625e-05ZM0.5064 3.04722L1.40161 10.174C1.46053 10.6451 1.88611 11 2.39239 11L7.60761 11C8.11389 11 8.53898 10.6451 8.59839 10.174L9.4936 3.04722L0.5064 3.04722Z"
                    fill="white"
                  />
                </svg>
              </base-button>
            </div>
          </template>
          <template #center
            ><span class="font-extralight">{{ rightSeperatorText }}</span></template
          >
        </seperator>
      </slot>
    </container>
    <div v-for="plan in data" :key="plan._id">
      <container
        v-if="plan._id === currentPlanId"
        :id="plan._id"
        :style="containerStyle"
        :border-left="noBorder ? false : true"
      >
        <div class="flex-col items-center content-center space-y-4">
          <div class="flex items-center m-0 mt-8 space-x-4 text-2xl">
            <base-input
              :z-index="-10"
              class="w-44"
              label="From"
              inputClasses="text-center"
              :value="new Date(plan.startDate).toLocaleDateString('en-US')"
              readonly
            />
            <base-input
              :z-index="-10"
              inputClasses="text-center"
              class="w-44"
              label="To"
              :value="new Date(plan.endDate).toLocaleDateString('en-US')"
              readonly
            />
            <base-input
              :z-index="-10"
              inputClasses="text-center"
              classes="rounded-small"
              class="w-44"
              label="Status"
              :value="plan.status === finishedStatus ? 'Finished' : 'In Progress'"
              :bg-color="plan.status === finishedStatus ? '#D63031' : '#00CEC9'"
              color="#fff"
              readonly
            />
          </div>
          <div class="items-start space-y-4 sm:space-y-0 sm:space-x-4 todays-plan-display">
            <div class="relative todays-image-container">
              <img
                class="todays-image box"
                :src="
                  require('../../../../Server/uploads/images/' + plan.image)
                    ? require('../../../../Server/uploads/images/' + plan.image)
                    : require('../../../../Server/uploads/images/default.png')
                "
                :alt="plan.title"
              />
              <div class="absolute top-0 right-0 flex-col m-4 space-y-3 lg:hidden">
                <base-button
                  @click="editPlan(plan._id)"
                  class="button"
                  icon
                  bg-color="white"
                >
                  <svg width="1.5rem" height="1.5rem" viewBox="0 0 12 12">
                    <path
                      d="M9.96401 0C9.4473 0 8.93059 0.200514 8.52956 0.601542L0.724936 8.40617L0.694087 8.56041L0.154242 11.2751L0 12L0.724936 11.8458L3.43959 11.3059L3.59383 11.2751L11.3985 3.47044C12.2005 2.66838 12.2005 1.4036 11.3985 0.601542C10.9974 0.200514 10.4807 0 9.96401 0ZM9.96401 0.940874C10.2127 0.940874 10.4634 1.05463 10.7044 1.29563C11.1844 1.77571 11.1844 2.29627 10.7044 2.77635L10.3496 3.11568L8.88432 1.65039L9.22365 1.29563C9.46465 1.05463 9.7153 0.940874 9.96401 0.940874ZM8.19023 2.34447L9.65553 3.80977L3.68638 9.77892C3.36247 9.14653 2.85347 8.63753 2.22108 8.31363L8.19023 2.34447ZM1.58869 9.11568C2.18059 9.35476 2.64524 9.81941 2.88432 10.4113L1.26478 10.7352L1.58869 9.11568Z"
                      fill="#777777"
                    />
                  </svg>
                  <div class="tooltip">Edit</div>
                </base-button>
                <base-button
                  @click="finishedPlan(plan._id)"
                  class="button"
                  icon
                  bg-color="#00745D"
                >
                  <svg width="1.6rem" viewBox="0 0 13 8">
                    <path
                      d="M12.4651 0.000193121C12.3302 0.00363171 12.2021 0.0518623 12.108 0.134667L4.16345 6.92777L0.894313 4.13244C0.846444 4.08981 0.789108 4.05578 0.725664 4.03233C0.662219 4.00888 0.593941 3.9965 0.524828 3.9959C0.455715 3.99529 0.387156 4.00649 0.323166 4.02883C0.259177 4.05117 0.201043 4.0842 0.15217 4.12599C0.103297 4.16778 0.0646674 4.21749 0.0385427 4.2722C0.012418 4.32692 -0.000676275 4.38554 2.68896e-05 4.44463C0.000730055 4.50373 0.0152165 4.56211 0.0426377 4.61636C0.070059 4.67061 0.109864 4.71964 0.159721 4.76057L3.79615 7.86995C3.89358 7.95322 4.02569 8 4.16345 8C4.3012 8 4.43332 7.95322 4.53074 7.86995L12.8426 0.76279C12.9177 0.700397 12.9689 0.620068 12.9897 0.53233C13.0104 0.444592 12.9997 0.353539 12.9589 0.271102C12.9181 0.188665 12.8491 0.118691 12.761 0.0703496C12.6729 0.0220081 12.5698 -0.00244557 12.4651 0.000193121Z"
                      fill="white"
                    />
                  </svg>
                  <div class="tooltip">Done</div>
                </base-button>
                <base-button
                  @click="deletePlan(plan._id)"
                  class="button"
                  icon
                  bg-color="#D63031"
                >
                  <svg width="1.5rem" height="1.7rem" viewBox="0 0 10 11">
                    <path
                      d="M4.9922 5.70625e-05C4.85995 0.00199399 4.73392 0.0530134 4.64178 0.141918C4.54963 0.230823 4.4989 0.350349 4.50071 0.474263V0.708169L1.75462 0.708169C1.68848 0.707328 1.62283 0.718807 1.56146 0.741939C1.5001 0.765071 1.44425 0.799396 1.39717 0.842919C1.35008 0.886443 1.31269 0.938298 1.28717 0.995474C1.26165 1.05265 1.24851 1.11401 1.24851 1.17598L0.5064 1.17598C0.440238 1.1751 0.374551 1.18656 0.313154 1.20967C0.251757 1.23279 0.195876 1.26711 0.148759 1.31063C0.101641 1.35416 0.0642259 1.40603 0.0386884 1.46322C0.0131509 1.52041 0 1.58179 0 1.64379C0 1.70579 0.0131509 1.76716 0.0386884 1.82436C0.0642259 1.88155 0.101641 1.93342 0.148759 1.97695C0.195876 2.02047 0.251757 2.05479 0.313154 2.07791C0.374551 2.10102 0.440238 2.11248 0.5064 2.1116L9.4936 2.1116C9.55976 2.11248 9.62545 2.10102 9.68685 2.07791C9.74824 2.05479 9.80412 2.02047 9.85124 1.97695C9.89836 1.93342 9.93577 1.88155 9.96131 1.82436C9.98685 1.76716 10 1.70579 10 1.64379C10 1.58179 9.98685 1.52041 9.96131 1.46322C9.93577 1.40603 9.89836 1.35416 9.85124 1.31063C9.80412 1.26711 9.74824 1.23279 9.68685 1.20967C9.62545 1.18656 9.55976 1.1751 9.4936 1.17598L8.75149 1.17598C8.75149 1.11401 8.73835 1.05265 8.71283 0.995474C8.68731 0.938298 8.64992 0.886443 8.60283 0.842919C8.55575 0.799396 8.4999 0.765071 8.43854 0.741939C8.37717 0.718807 8.31152 0.707328 8.24538 0.708169L5.49929 0.708169V0.474263C5.5002 0.411675 5.48771 0.349552 5.46253 0.291571C5.43736 0.23359 5.40003 0.180932 5.35274 0.136714C5.30546 0.092496 5.24919 0.0576175 5.18726 0.0341441C5.12533 0.0106706 5.059 -0.000920479 4.9922 5.70625e-05ZM0.5064 3.04722L1.40161 10.174C1.46053 10.6451 1.88611 11 2.39239 11L7.60761 11C8.11389 11 8.53898 10.6451 8.59839 10.174L9.4936 3.04722L0.5064 3.04722Z"
                      fill="white"
                    />
                  </svg>
                  <div class="tooltip">Delete</div>
                </base-button>
              </div>
            </div>
            <div class="flex-col m-0 space-y-4 todays-plan-info">
              <base-input classes="text-2xl" :value="plan.title" readonly />
              <base-textarea rows="6" :value="plan.description" color="#777" readonly />
            </div>
          </div>
        </div>
      </container>
    </div>
    <div v-if="data.length > 1" class="flex items-center justify-center space-x-4">
      <base-button @click="prevPlan()" bg-color="#fff">
        <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
          <path
            d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z"
            fill="#0984E3"
          />
        </svg>
      </base-button>
      <div class="px-5 py-3 text-blue">
        <span class="text-3xl font-light">
          {{ plans_currentIndex + 1 }} / {{ plans_length }}
        </span>
      </div>
      <base-button @click="nextPlan()" bg-color="#fff">
        <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3" />
        </svg>
      </base-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import planControls from "../../mixins/planControls";
export default defineComponent({
  mixins: [planControls],
  data() {
    return {
      finishedStatus: "finished",
      inProgressStatus: "in-progress",
      editable: true,
      plans_currentIndex: 0,
      currentPlanId: ''
    };
  },
  computed: {
    plans_length():number {
      return this.data.length
    }
  },
  props: [
    "leftSeperatorText",
    "rightSeperatorText",
    "data",
    "classes",
    "no-border",
    "container-style",
  ],
  methods: {
    prevPlan() {
      if (this.plans_currentIndex - 1 < 0) {
        this.plans_currentIndex = this.plans_length - 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id
      } else {
        this.plans_currentIndex = this.plans_currentIndex - 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id
      }
    },
    nextPlan() {
      if (this.plans_currentIndex + 1 > this.plans_length - 1) {
        this.plans_currentIndex = 0;
        this.currentPlanId = this.data[this.plans_currentIndex]._id
      } else {
        this.plans_currentIndex = this.plans_currentIndex + 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id
      }
    },
  },
  mounted() {
    this.currentPlanId = this.data[this.plans_currentIndex]._id
  }
});
</script>
<style lang="scss" scoped>
.tooltip {
  @apply absolute px-2 py-1 transform -translate-x-full -translate-y-1/2 bg-gray-200 top-1/2 -left-2;
  display: none;
  color: #777;
}
.button {
  &:hover .tooltip {
    display: block;
  }
}
.todays-image {
  border-radius: 3px;
}
img {
  width: 100%;
}
.todays-plan-info {
  width: 100%;
}
@media (min-width: 640px) {
  img {
    height: 200px;
  }
  .todays-plan-display {
    display: flex;
    flex-direction: row;
  }
  .todays-image-container {
    width: 500px;
  }
}
@media (min-width: 1024px) {
  img {
    height: 229px;
  }
}
@media (min-width: 1280px) {
  img {
    height: 266px;
  }
}
@media (max-width: 640px) {
  .todays-plan-display {
    display: flex;
    flex-direction: column;
  }
}
</style>
