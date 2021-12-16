<template>
  <div>
    <table class="w-full box">
      <tr>
        <th class="w-2/12">Months</th>
        <th>Note</th>
      </tr>
      <tr v-for="(plans, i) in renderedData" :key="i">
        <td class="relative">
          <div :class="{ current: plans[0].month === currentMonth }"></div>
          {{ plans[0].month }}
        </td>
        <td
          v-for="{ title, _id, menu, image } in plans"
          :key="_id"
          class="relative flex"
        >
          <div class="flex space-x-2">
            <img class="w-8" :src="getImage(image)" :alt="title" />
            <span>
              {{ title }}
            </span>
          </div>
          <div v-if="title" class="absolute top-0 right-0">
            <div
              @click="toggleMenu(_id)"
              class="absolute"
              :class="{ 'info-button': !menu, 'info-button-close': menu }"
            >
            <dot-menu-icon v-if="!menu"/>
            <close-icon v-else/>
            </div>
            <div v-if="menu" class="plan-info">
              <div class="flex items-center space-x-2">
                <base-button @click="editPlan(_id)" bg-color="#777" color="#fff"
                  ><span class="pb-1 text-sm">Edit</span></base-button
                >
                <base-button
                  @click="finishedPlan(_id)"
                  bg-color="#00745D"
                  color="#fff"
                  ><span class="pb-1 text-sm">Done</span></base-button
                >
                <base-button
                  @click="deletePlan(_id)"
                  bg-color="#D63031"
                  color="#fff"
                  ><span class="pb-1 text-sm">Delete</span></base-button
                >
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="month-controller">
      <base-button @click="fetchNewYearPlans('prev')" bg-color="#fff">
        <prev-arrow-icon />
      </base-button>
      <div class="px-5 py-3 box text-blue">
        <span class="font-light">Year: </span>
        <span class="font-bold">{{ currentYear }}</span>
      </div>
      <base-button @click="fetchNewYearPlans('next')" bg-color="#fff">
        <next-arrow-icon />
      </base-button>
      <base-button
        v-if="isCurrentButton"
        color="#fff"
        @click="goToCurrentYear"
        bg-color="#0984E3"
      >
        <reset-icon />
        <span class="pt-1 pb-2 font-semibold">Current year</span>
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import nextArrowIcon from "../../Icons/NextArrow.vue"
import prevArrowIcon from "../../Icons/PrevArrow.vue"
import resetIcon from "../../Icons/Reset.vue"
import dotMenuIcon from "../../Icons/DotMenu.vue"
import closeIcon from "../../Icons/CloseIcon.vue"
import planControls from "../../../mixins/planControls";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import getImage from "../../../util/getImage";
interface MonthlyPlan {
  _id: string;
  status: boolean;
  month: string;
  month_number: number;
  title: string;
  startDate: Date;
  menu: boolean;
}

export default defineComponent({
  components: {dotMenuIcon, closeIcon, resetIcon, nextArrowIcon, prevArrowIcon},
  mixins: [planControls],
  data() {
    return {
      renderedData: [] as MonthlyPlan[],
      currentYear: new Date().getFullYear(),
      isCurrentButton: false,
    };
  },
  watch: {
    data() {
      this.getMonths();
    },
  },
  computed: {
    ...mapGetters({
      data: "plans/getMonthlyPlans",
    }),
    today(): number {
      const date = new Date();
      return date.getDate();
    },
    currentMonth(): string {
      return new Date().toLocaleString("en-US", { month: "long" });
    },
  },
  methods: {
    getImage,
    goToCurrentYear() {
      this.currentYear = new Date().getFullYear();
      this.getData(this.currentYear);
      this.watchYear();
    },
    watchYear() {
      if (this.currentYear === new Date().getFullYear()) {
        this.isCurrentButton = false;
      }
    },
    fetchNewYearPlans(nextOrPrev: string) {
      if (nextOrPrev === "next") {
        this.currentYear += 1;
        this.getData(this.currentYear);
      } else if (nextOrPrev === "prev") {
        this.currentYear -= 1;
        this.getData(this.currentYear);
      }
      this.watchYear();
      if (
        !this.isCurrentButton &&
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isCurrentButton = true;
      }
    },
    toggleMenu(id: string) {
      this.renderedData.forEach((plan: any) => {
        plan.forEach((pl: any, j: number) => {
          if (pl._id === id) {
            (plan as any).splice(j, 1, {
              ...pl,
              menu: !pl.menu,
            });
            return;
          }
        });
      });
    },
    getData(year: number) {
      (this.$store as any)
        .dispatch("plans/monthlyPlans/fetchPlans", { year })
        .then(() => {
          this.getMonths();
        })
        .catch((err: any) => {
          if (err.statusCode === 404) {
            this.getMonths();
          }
        });
    },
    getMonths() {
      this.renderedData = [];
      for (let month = 1; month <= 12; month++) {
        const d = new Date();
        const plan = { menu: false } as any;
        plan.month = new Date(d.getFullYear(), month, 1).toLocaleDateString(
          "en-US",
          { month: "long" }
        );
        plan.menu = false;
        if (this.data[month]) {
          let plansWithSameDate: any = [];
          this.data[month].forEach((p: any) => {
            const pl = { menu: false } as any;
            pl.month = new Date(d.getFullYear(), month, 1).toLocaleDateString(
              "en-US",
              { month: "long" }
            );
            pl.menu = false;
            pl.title = p.title;
            pl.status = p.status;
            pl._id = p._id;
            pl.image = p.image;
            plansWithSameDate.push(pl);
          });
          (this.renderedData as any).push(plansWithSameDate);
          plansWithSameDate = [];
        } else {
          (this.renderedData as any).push([plan]);
        }
      }
    },
  },
  mounted() {
    this.getData(this.currentYear);
  },
});
</script>
