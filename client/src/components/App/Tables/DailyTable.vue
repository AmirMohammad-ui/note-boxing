<template>
  <div>
    <table class="w-full box">
      <tr>
        <th>Weekdays</th>
        <th>Date</th>
        <th class="w-4/5">Plan</th>
      </tr>
      <tr
        v-for="(plan,i) in renderedData"
        :key="i"
        :style="{ backgroundColor: plan[0].day === 'Sunday' ? '#e2e2e2' : '' }"
      >      
        <td class="relative">
          <div :class="{ current: plan[0].date === currentDate }"></div>
          {{ plan[0].day }}
        </td>
        <td>{{ i+1 }}</td>
        <td v-for="{title,_id,menu,image} in plan" :key="_id" class="relative flex">
          <div class="flex space-x-2">
            <img class="w-8" :src="image" :alt="title">
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
              <svg v-if="!menu" class="" width="5" height="20" viewBox="0 0 5 20">
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
            <div v-if="menu" class="plan-info">
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
    <div class="w-full date-controller">
      <div
        class="flex flex-col items-center space-x-0 space-y-6 sm:space-x-6 sm:justify-end sm:space-y-0 sm:flex-row"
      >
        <div
          class="flex flex-col items-center justify-center space-x-0 space-y-6 sm:space-x-10 sm:flex-row sm:space-y-0 sm:justify-end"
        >
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
          </div>
        </div>
        <div>
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
  </div>
</template>
<script lang="ts">
import planControls from "../../../mixins/planControls";
import { addDays,getDaysInMonth,startOfMonth } from "date-fns"
import { defineComponent } from "vue";
import { mapGetters} from "vuex"
export default defineComponent({
  mixins: [planControls],
  data() {
    return {
      renderedData: [],
      date: new Date(),
      currentMonthNumber: new Date().getMonth(),
      isGoToCurrentButton: false,
      currentYear: new Date().getFullYear(),
    };
  },
  watch: {
    data() {
      this.getDays()
    }
  },
  computed: {
    ...mapGetters({
      data: "plans/getDailyPlans"
    }),
    currentMonth(): string {
      return new Date(this.date.setMonth(this.currentMonthNumber)).toLocaleString(
        "en-US",
        { month: "long" }
      );
    },
    currentDate(): number {
      return new Date().getDate();
    },
    thisMonthLength(): number {
      return getDaysInMonth(new Date());
    },
  },
  methods: {
    img(img:string):any {
      return require("../../../../../server/uploads/images/"+img)
    },
    watchMonthAndYear() {
      if (
        this.currentMonthNumber === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = false;
      }
    },
    goToCurrentMonthAndYear() {
      this.currentMonthNumber = new Date().getMonth();
      this.currentYear = new Date().getFullYear();
      this.getData(this.currentYear,this.currentMonthNumber);
      this.watchMonthAndYear();
    },
    fetchNewYearPlans(nextOrPrev: string) {
      if (nextOrPrev === "next") {
        this.currentYear += 1;
        this.getData(this.currentYear,this.currentMonthNumber);
      } else if (nextOrPrev === "prev") {
        this.currentYear -= 1;
        this.getData(this.currentYear,this.currentMonthNumber);
      }
      this.watchMonthAndYear();
      if (
        (!this.isGoToCurrentButton &&
          this.currentMonthNumber !== new Date().getMonth()) ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = true;
      }
    },
    fetchNewMonthPlan(nextOrPrev: string) {
      if (nextOrPrev === "next") {
        this.currentMonthNumber++
        this.currentYear = new Date(this.currentYear,this.currentMonthNumber,1).getFullYear()
        this.getData(this.currentYear,this.currentMonthNumber);
      } else if (nextOrPrev === "prev") {
        this.currentMonthNumber--;
        this.currentYear = new Date(this.currentYear,this.currentMonthNumber,1).getFullYear()
        this.getData(this.currentYear,this.currentMonthNumber)
      }
      this.watchMonthAndYear();
      if (
        (!this.isGoToCurrentButton &&
          this.currentMonthNumber !== new Date().getMonth()) ||
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = true;
      }
    },
    getData(year:number, month:number){
      const that = this;
      (this.$store as any).dispatch("plans/dailyPlans/fetchPlans",{
        year,month
      })
        .then(()=> {
          that.getDays()
        })
        .catch((err:any)=>{
          if(err.statusCode === 404){
            that.getDays()
          }
        })
    },
    toggleMenu(id: string) {
      this.renderedData.forEach((plan: any) => {
        plan.forEach((pl:any,j:number) => {
          if (pl._id === id) {
            (plan as any).splice(j, 1, {
              ...pl,
              menu: !pl.menu
            });
            return
          }
        })
      });
    },
    getWeekday(d: number): string {
      const day = addDays(startOfMonth(new Date()),d-1).toLocaleDateString("en-US",{weekday: 'long'});
      return day;
    },
    getDays() {
      this.renderedData = [];
      for (let day = 1; day <= this.thisMonthLength; day++) {
        const plan = { menu: false } as any;
        plan.day = this.getWeekday(day);
        plan.date = day;
        plan.menu = false;
        if(this.data[day]) {
          let plansWithSameDate:any = [];
          this.data[day].forEach((p:any) => {
            const pl = { menu: false } as any;
            pl.day = this.getWeekday(day);
            pl.date = day;
            pl.menu = false;
            pl.title = p.title;
            pl.status = p.status;
            pl._id = p._id;
            pl.image = this.img(p.image);
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
    this.getData(this.currentYear,this.currentMonthNumber)
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