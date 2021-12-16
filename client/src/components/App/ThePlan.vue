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
            ><span class="font-extrabold">{{
              leftSeperatorText
            }}</span></template
          >
          <template #right>
            <div class="flex items-center space-x-2">
              <base-button
                @click="editPlan(currentPlanId)"
                icon
                bg-color="white"
              >
              <edit-icon />
              </base-button>
              <base-button
                @click="finishedPlan(currentPlanId)"
                icon
                bg-color="#00745D"
              >
              <check-icon />
              </base-button>
              <base-button
                @click="deletePlan(currentPlanId)"
                icon
                bg-color="#D63031"
              >
              <delete-icon />
              </base-button>
            </div>
          </template>
          <template #center
            ><span class="font-extralight">{{
              rightSeperatorText
            }}</span></template
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
          <div class="flex items-center m-0 mt-8 text-2xl space-x-4">
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
              :value="
                plan.status === finishedStatus ? 'Finished' : 'In Progress'
              "
              :bg-color="plan.status === finishedStatus ? '#D63031' : '#00CEC9'"
              color="#fff"
              readonly
            />
          </div>
          <div
            class="items-start  space-y-4 sm:space-y-0 sm:space-x-4 todays-plan-display"
          >
            <div class="relative todays-image-container">
              <img
                class="todays-image box"
                :src="getImage(plan.image)"
                :alt="plan.title"
              />
              <div
                class="absolute top-0 right-0 flex-col m-4 space-y-3 lg:hidden"
              >
                <base-button
                  @click="editPlan(plan._id)"
                  class="button"
                  icon
                  bg-color="white"
                >
                <editIcon />
                  <div class="tooltip">Edit</div>
                </base-button>
                <base-button
                  @click="finishedPlan(plan._id)"
                  class="button"
                  icon
                  bg-color="#00745D"
                >
                <checkIcon />
                  <div class="tooltip">Done</div>
                </base-button>
                <base-button
                  @click="deletePlan(plan._id)"
                  class="button"
                  icon
                  bg-color="#D63031"
                >
                <deleteIcon />
                  <div class="tooltip">Delete</div>
                </base-button>
              </div>
            </div>
            <div class="flex-col m-0 space-y-4 todays-plan-info">
              <base-input classes="text-2xl" :value="plan.title" readonly />
              <base-textarea
                rows="6"
                :value="plan.description"
                color="#777"
                readonly
              />
            </div>
          </div>
        </div>
      </container>
    </div>
    <div
      v-if="data.length > 1"
      class="flex items-center justify-center space-x-4"
    >
      <base-button @click="prevPlan()" bg-color="#fff">
        <prev-arrow-icon />
      </base-button>
      <div class="px-5 py-3 text-blue">
        <span class="text-3xl font-light">
          {{ plans_currentIndex + 1 }} / {{ plans_length }}
        </span>
      </div>
      <base-button @click="nextPlan()" bg-color="#fff">
        <next-arrow-icon />
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import nextArrowIcon from "../Icons/NextArrow.vue"
import prevArrowIcon from "../Icons/PrevArrow.vue"
import checkIcon from "../Icons/CheckIcon.vue"
import editIcon from "../Icons/EditIcon.vue"
import deleteIcon from "../Icons/DeleteIcon.vue"
import getImage from "../../util/getImage";
import { defineComponent } from "vue";
import planControls from "../../mixins/planControls";
export default defineComponent({
  components: {deleteIcon,checkIcon,editIcon, prevArrowIcon, nextArrowIcon},
  mixins: [planControls],
  data() {
    return {
      finishedStatus: "finished",
      inProgressStatus: "in-progress",
      editable: true,
      plans_currentIndex: 0,
      currentPlanId: "",
    };
  },
  computed: {
    plans_length(): number {
      return this.data.length;
    },
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
    getImage,
    prevPlan() {
      if (this.plans_currentIndex - 1 < 0) {
        this.plans_currentIndex = this.plans_length - 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id;
      } else {
        this.plans_currentIndex = this.plans_currentIndex - 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id;
      }
    },
    nextPlan() {
      if (this.plans_currentIndex + 1 > this.plans_length - 1) {
        this.plans_currentIndex = 0;
        this.currentPlanId = this.data[this.plans_currentIndex]._id;
      } else {
        this.plans_currentIndex = this.plans_currentIndex + 1;
        this.currentPlanId = this.data[this.plans_currentIndex]._id;
      }
    },
  },
  mounted() {
    this.currentPlanId = this.data[this.plans_currentIndex]._id;
  },
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
