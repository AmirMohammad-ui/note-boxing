<template>
  <div>
    <table class="w-full box">
      <tr>
        <th>Weekdays</th>
        <th>Date</th>
        <th class="w-4/5">Plan</th>
      </tr>
      <tr
        v-for="{ wd_name, wd_date, wd_plan, wd_menu, _id } in MonthsDailyPlan"
        :key="wd_date"
        :style="{ backgroundColor: wd_name === 'Sunday' ? '#e2e2e2' : '' }"
      >
        <td class="relative">
          <div :class="{ current: wd_date === currentDate }"></div>
          {{ wd_name }}
        </td>
        <td>{{ wd_date }}</td>
        <td class="relative">
          {{ wd_plan }}
          <div v-if="wd_plan" class="absolute top-0 right-0">
            <div
              @click="toggleMenu(wd_date)"
              class="absolute"
              :class="{ 'info-button': !wd_menu, 'info-button-close': wd_menu }"
            >
              <svg v-if="!wd_menu" class="" width="5" height="20" viewBox="0 0 5 20">
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
            <div v-if="wd_menu" class="plan-info">
              <div class="flex items-center space-x-2">
                <base-button @click="editPlan(_id)" bg-color="#777" color="#fff"
                  ><span class="pb-1 text-sm">Edit</span></base-button
                >
                <base-button @click="finishedPlan(_id)" bg-color="#00745D" color="#fff"
                  ><span class="pb-1 text-sm">Done</span></base-button
                >
                <base-button @click="deletePlan(_id)" bg-color="#D63031" color="#fff"
                  ><span class="pb-1 text-sm">Delete</span></base-button
                >
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="date-controller">
      <div class="flex items-center space-x-4">
        <base-button @click="fetchNewMonthPlan('prev')" bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
            <path
              d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z"
              fill="#0984E3"
            />
          </svg>
        </base-button>
        <div class="px-5 py-3 box text-blue">
          <span class="font-light">Month: </span>
          <span class="font-bold">{{ currentMonth }}</span>
        </div>
        <base-button @click="fetchNewMonthPlan('next')" bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
            <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3" />
          </svg>
        </base-button>
      </div>
      <div class="flex items-center space-x-4">
        <base-button @click="fetchNewYearPlans('prev')" bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
            <path
              d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z"
              fill="#0984E3"
            />
          </svg>
        </base-button>
        <div class="px-5 py-3 box text-blue">
          <span class="font-light">Year: </span>
          <span class="font-bold">{{ currentYear }}</span>
        </div>
        <base-button @click="fetchNewYearPlans('next')" bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17">
            <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3" />
          </svg>
        </base-button>
        <base-button
          v-if="isGoToCurrentButton"
          color="#fff"
          @click="goToCurrentMonthAndYear"
          bg-color="#0984E3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M12 0.000100007C11.8675 -0.00177404 11.7359 0.0227073 11.613 0.072121C11.49 0.121535 11.3781 0.194895 11.2837 0.28794C11.1893 0.380984 11.1144 0.491857 11.0632 0.614114C11.0121 0.736371 10.9858 0.867575 10.9858 1.0001C10.9858 1.13263 11.0121 1.26383 11.0632 1.38609C11.1144 1.50834 11.1893 1.61922 11.2837 1.71226C11.3781 1.8053 11.49 1.87867 11.613 1.92808C11.7359 1.97749 11.8675 2.00197 12 2.0001C17.5345 2.0001 22 6.46557 22 12.0001C22 17.5346 17.5345 22.0001 12 22.0001C6.46547 22.0001 2 17.5346 2 12.0001C2 9.65034 2.80854 7.49693 4.16016 5.79307L6 8.0001L8 1.0001L1 2.0001L2.86719 4.24033C1.08667 6.33517 0 9.04189 0 12.0001C0 18.6156 5.38453 24.0001 12 24.0001C18.6155 24.0001 24 18.6156 24 12.0001C24 5.38463 18.6155 0.000100007 12 0.000100007Z"
              fill="#fff"
            />
          </svg>
          <span class="pt-1 pb-2 font-semibold">Current Month</span>
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
import planControls from "@/mixins/planControls.js";
export default {
  mixins: [planControls],
  props: ["data"],
  data() {
    return {
      MonthsDailyPlan: [],
      date: new Date(),
      currentMonthNumber: new Date().getMonth(),
      isGoToCurrentButton: false,
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    currentMonth() {
      return new Date(this.date.setMonth(this.currentMonthNumber)).toLocaleString(
        "en-US",
        { month: "long" }
      );
    },
    dailyPlans() {
      return this.data;
    },
    currentDate() {
      return new Date().getDate();
    },
    thisMonthLength() {
      return +new Date(this.date.setDate(-1)).toLocaleString("en-US", { day: "numeric" });
    },
  },
  methods: {
    watchMonthAndYear() {
      if (
        this.currentMonthNumber === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = false;
      }
    },
    goToCurrentMonthAndYear() {
      /* Fetch current date data here and call this.getDaty() */
      console.log('Fetching...')
      // Reseting month and year
      this.currentMonthNumber = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.watchMonthAndYear();
    },
    fetchNewYearPlans(nextOrPrev) {
      /* Fetch current date data here and call this.getDaty() */
      console.log("Fetching...")
      if (nextOrPrev === "next") {
        this.currentYear += 1;
      } else if (nextOrPrev === "prev") {
        this.currentYear -= 1;
      }
      this.watchMonthAndYear();
      if (
        !this.isGoToCurrentButton &&
        this.currentMonthNumber !== new Date().getMonth() ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = true;
      }
    },
    fetchNewMonthPlan(nextOrPrev) {
      /* Fetch current date data here and call this.getDaty() */
      console.log("Fetching...")
      if (nextOrPrev === "next") {
        if (this.currentMonthNumber > 11) {
          this.currentMonthNumber = 0;
        } else {
          this.currentMonthNumber += 1;
        }
      } else if (nextOrPrev === "prev") {
        if (this.currentMonthNumber < 0) {
          this.currentMonthNumber = 11;
        } else {
          this.currentMonthNumber -= 1;
        }
      }
      this.watchMonthAndYear();
      if (
        !this.isGoToCurrentButton &&
        this.currentMonthNumber !== new Date().getMonth() ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = true;
      }
    },
    toggleMenu(date) {
      this.MonthsDailyPlan.forEach((wd, inx) => {
        if (wd.wd_date === date) {
          this.MonthsDailyPlan.splice(inx, 1, {
            ...wd,
            wd_menu: !wd.wd_menu,
          });
        }
      });
    },
    getWeekday(d) {
      const day = new Date(this.date.setDate(d)).toLocaleString("en-US", {
        weekday: "long",
      });
      return day;
    },
    getDays() {
      for (let day = 1; day <= this.thisMonthLength; day++) {
        const plan = { wd_menu: false };
        plan.wd_name = this.getWeekday(day);
        plan.wd_date = day;
        plan.wd_menu = false;
        this.data.forEach((p) => {
          if (+p.wd_date === day) {
            plan.wd_plan = p.wd_date && +p.wd_date === day ? p.wd_plan : "";
            plan._id = p._id;
          }
        });
        this.MonthsDailyPlan.push(plan);
      }
    },
  },
  mounted() {
    this.getDays();
  },
};
</script>
