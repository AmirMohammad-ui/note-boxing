<template>
  <div>
    <table class="w-full box">
      <tr>
        <th class="w-2/12">Months</th>
        <th>Note</th>
      </tr>
      <tr v-for="{ month, title, month_number,menu, _id } in renderedData" :key="_id">
        <td class="relative">
          <div :class="{ current: month === currentMonth }"></div>
          {{ month }}
        </td>
        <td class="relative">
          {{ title }}
          <div v-if="title" class="absolute top-0 right-0">
            <div
              @click="toggleMenu(month_number)"
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
    <div class="month-controller">
      <base-button @click="fetchNewYearPlans('prev')" bg-color="#fff">
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
        <span class="font-bold">{{currentYear}}</span>
      </div>
      <base-button @click="fetchNewYearPlans('next')" bg-color="#fff">
        <svg
          class="my-2"
          width="15"
          height="17"
          viewBox="0 0 15 17"
        >
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3" />
        </svg>
      </base-button>
      <base-button
        v-if="isGoToCurrentButton"
        color="#fff"
        @click="goToCurrentYear"
        bg-color="#0984E3"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M12 0.000100007C11.8675 -0.00177404 11.7359 0.0227073 11.613 0.072121C11.49 0.121535 11.3781 0.194895 11.2837 0.28794C11.1893 0.380984 11.1144 0.491857 11.0632 0.614114C11.0121 0.736371 10.9858 0.867575 10.9858 1.0001C10.9858 1.13263 11.0121 1.26383 11.0632 1.38609C11.1144 1.50834 11.1893 1.61922 11.2837 1.71226C11.3781 1.8053 11.49 1.87867 11.613 1.92808C11.7359 1.97749 11.8675 2.00197 12 2.0001C17.5345 2.0001 22 6.46557 22 12.0001C22 17.5346 17.5345 22.0001 12 22.0001C6.46547 22.0001 2 17.5346 2 12.0001C2 9.65034 2.80854 7.49693 4.16016 5.79307L6 8.0001L8 1.0001L1 2.0001L2.86719 4.24033C1.08667 6.33517 0 9.04189 0 12.0001C0 18.6156 5.38453 24.0001 12 24.0001C18.6155 24.0001 24 18.6156 24 12.0001C24 5.38463 18.6155 0.000100007 12 0.000100007Z"
            fill="#fff"
          />
        </svg>
        <span class="pt-1 pb-2 font-semibold">Current year</span>
      </base-button>
    </div>
  </div>
</template>
<script lang="ts">
interface MonthlyPlan {
  _id: string; 
  status: boolean;
  month: string; 
  month_number: number;
  title: string; 
  startDate: Date;
  menu: boolean;
}
import planControls from "../../../mixins/planControls"
import {defineComponent} from "vue"
import {mapGetters} from "vuex"
export default defineComponent({
  mixins: [planControls],
  data(){
    return {
      renderedData: [] as MonthlyPlan[],
      currentYear: new Date().getFullYear(),
      isGoToCurrentButton: false
    }
  },
  watch:{
    today(value){
        console.log(value)
    }
  },
  computed: {
    ...mapGetters({
      data: "plans/monthlyPlans/getPlans"
    }),
    today():number {
      const date = new Date();
      return date.getDate();
    },
    currentMonth():string {
      return new Date().toLocaleString("en-US",{month:'long'})
    },
  },
  methods: {
    goToCurrentYear() {
      this.currentYear = new Date().getFullYear()
      this.getData(this.currentYear)
      this.watchYear()
    },
    watchYear() {
      if (
        this.currentYear === new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = false;
      }
    },
    fetchNewYearPlans(nextOrPrev:string) {
      if (nextOrPrev === "next") {
        this.currentYear += 1;
        this.getData(this.currentYear)
      } else if (nextOrPrev === "prev") {
        this.currentYear -= 1;
        this.getData(this.currentYear)
      }
      this.watchYear();
      if (
        !this.isGoToCurrentButton &&
        this.currentYear !== new Date().getFullYear()
      ) {
        this.isGoToCurrentButton = true;
      }
    },
    toggleMenu(monthNum:number) {
      this.renderedData.forEach((m:MonthlyPlan,inx:number) => {
        if(m.month_number === monthNum) {
          this.renderedData.splice(inx,1,{
            ...m,
            menu: !m.menu,
          })
        }
      })
    },
    getData(year: number){
      (this.$store as any).dispatch("plans/monthlyPlans/fetchPlans",{year})
        .then(() => {
          this.getMonths()
        })
        .catch((err:any)=> {
          if(err.statusCode === 404) {
            this.getMonths()
          }
        })
    },
    getMonths() {
      const date = new Date();
      this.renderedData = []
      for (let m = 0;m < 12;m++) {
        const month = new Date(date.setMonth(m)).toLocaleString("en-US",{month: 'long'})
        const plan = {
          month,
          month_number: m+1,
          menu: false
        } as MonthlyPlan
        if(this.data.length > 0){
          this.data.forEach((p:MonthlyPlan) => {
            const month_number = new Date(p.startDate).getMonth() 
            if(month_number===m+1) {
              plan.title = p.title
              plan._id = p._id
              plan.status = p.status
            }
          })
        }
        this.renderedData.push(plan)
      }
    }
  },
  mounted() {
    this.getData(this.currentYear)
  }
})
</script>
