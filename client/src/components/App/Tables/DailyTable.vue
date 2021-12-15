<template>
  <div>
    <table class="w-full box">
      <tr>
        <th>Weekdays</th>
        <th>Date</th>
        <th class="w-4/5">Plan</th>
      </tr>
      <tr
        v-for="(plan, i) in renderedData"
        :key="i"
        :style="{ backgroundColor: plan[0].day === 'Sunday' ? '#e2e2e2' : '' }"
      >
        <td class="relative">
          <div :class="{ current: plan[0].date === currentDate }"></div>
          {{ plan[0].day }}
        </td>
        <td>{{ i + 1 }}</td>
        <td
          v-for="{ title, _id, menu, image } in plan"
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
              <close-icon v-else />
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
    <div class="w-full date-controller">
      <div
        class="flex flex-col items-center space-x-0 space-y-6 sm:space-x-6 sm:justify-end sm:space-y-0 sm:flex-row"
      >
        <div
          class="flex flex-col items-center justify-center space-x-0 space-y-6 sm:space-x-2 sm:flex-row sm:space-y-0 sm:justify-end">
          <div class="flex items-center space-x-4">
            <base-button @click="fetchNewMonthPlan('prev')" bg-color="#fff">
              <prev-icon />
            </base-button>
            <div class="px-5 py-3 box text-blue">
              <span class="font-light">Month: </span>
              <span class="font-bold">{{ currentMonth }}</span>
            </div>
            <base-button @click="fetchNewMonthPlan('next')" bg-color="#fff">
              <next-icon />
            </base-button>
          </div>
          <div class="flex items-center space-x-4">
            <base-button @click="fetchNewYearPlans('prev')" bg-color="#fff">
              <prev-icon />
            </base-button>
            <div class="px-5 py-3 box text-blue">
              <span class="font-light">Year: </span>
              <span class="font-bold">{{ currentYear }}</span>
            </div>
            <base-button @click="fetchNewYearPlans('next')" bg-color="#fff">
              <next-icon />
            </base-button>
          </div>
        </div>
        <div>
          <base-button
            v-if="isCurrentButtonOpen"
            color="#fff"
            @click="goToCurrentMonthAndYear"
            bg-color="#0984E3"
          >
              <reset-icon />
            <span class="pt-1 pb-2 font-semibold">Current Month</span>
          </base-button>
        </div>
      </div>
      </div>
    </div>
</template>

<script lang="ts">
import closeIcon from "../../Icons/CloseIcon.vue"
import dotMenuIcon from "../../Icons/DotMenu.vue"
import resetIcon from "../../Icons/Reset.vue"
import nextIcon from "../../Icons/NextArrow.vue"
import prevIcon from "../../Icons/PrevArrow.vue"
import getImage from "../../../util/getImage";
import planControls from "../../../mixins/planControls";
import { addDays, getDaysInMonth, startOfMonth } from "date-fns";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {resetIcon, nextIcon, prevIcon, dotMenuIcon, closeIcon},
  mixins: [planControls],
  data() {
    return {
      renderedData: [],
      date: new Date(),
      currentMonthNumber: new Date().getMonth(),
      isCurrentButtonOpen: false,
      thisYearNumber: new Date().getFullYear()
    };
  },
  watch: {
    data() {
      this.getDays();
    },
  },
  computed: {
    ...mapGetters({
      data: "plans/getDailyPlans",
    }),
    currentYear():number {
      return new Date(
       this.thisYearNumber,
       this.currentMonthNumber,
       1
      ).getFullYear()
    },
    currentMonth(): string {
      return new Date(
        this.date.setMonth(this.currentMonthNumber)
      ).toLocaleString("en-US", { month: "long" });
    },
    currentDate(): number {
      return new Date().getDate();
    },
    thisMonthLength(): number {
      return getDaysInMonth(new Date());
    },
  },
  methods: {
    getImage,
    watchMonthAndYear() {
      if (
        this.currentMonthNumber === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
      ) {
        this.isCurrentButtonOpen = false;
      }
    },
    goToCurrentMonthAndYear() {
      this.currentMonthNumber = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.getData(this.currentYear, this.currentMonthNumber);
      this.watchMonthAndYear();
    },
    fetchNewYearPlans(nextOrPrev: string) {
      if (nextOrPrev === "next") {
        this.currentMonthNumber += 12;
        this.getData(this.currentYear, this.currentMonthNumber);
      } else if (nextOrPrev === "prev") {
        this.currentMonthNumber -= 12;
        this.getData(this.currentYear, this.currentMonthNumber);
      }
      this.watchMonthAndYear();
      if (
        (!this.isCurrentButtonOpen &&
          this.currentMonthNumber !== new Date().getMonth()) ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isCurrentButtonOpen = true;
      }
    },
    fetchNewMonthPlan(nextOrPrev: string) {
      if (nextOrPrev === "next") {
        this.currentMonthNumber++;
        this.getData(this.currentYear, this.currentMonthNumber);
      } else if (nextOrPrev === "prev") {
        this.currentMonthNumber--;
        this.getData(this.currentYear, this.currentMonthNumber);
      }
      this.watchMonthAndYear();
      if (
        (!this.isCurrentButtonOpen &&
          this.currentMonthNumber !== new Date().getMonth()) ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isCurrentButtonOpen = true;
      }
    },
    getData(year: number, month: number) {
      const that = this;
      (this.$store as any)
        .dispatch("plans/dailyPlans/fetchPlans", {
          year,
          month,
        })
        .then(() => {
          that.getDays();
        })
        .catch((err: any) => {
          if (err.statusCode === 404) {
            that.getDays();
          }
        });
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
    getWeekday(d: number): string {
      const day = addDays(startOfMonth(new Date()), d - 1).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );
      return day;
    },
    getDays() {
      this.renderedData = [];
      for (let day = 1; day <= this.thisMonthLength; day++) {
        const plan = { menu: false } as any;
        plan.day = this.getWeekday(day);
        plan.date = day;
        plan.menu = false;
        if (this.data[day]) {
          let plansWithSameDate: any = [];
          this.data[day].forEach((p: any) => {
            const pl = { menu: false } as any;
            pl.day = this.getWeekday(day);
            pl.date = day;
            pl.menu = false;
            pl.title = p.title;
            pl.status = p.status;
            pl._id = p._id;
            pl.image = p.image ? p.image : "";
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
    this.getData(this.currentYear, this.currentMonthNumber);
  },
});
</script>

<style lang="scss" scoped>
.seperator {
  width: 100%;
  height: 0.1px;
  background: #777;
}
</style>
