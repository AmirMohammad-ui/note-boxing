<template>
  <div class="mb-14">
    <table class="w-full box">
      <tr>
        <th class="w-1/12">Years</th>
        <th>Plans</th>
      </tr>
      <tr v-for="{ year, title, menu, _id } in renderedData" :key="year">
        <td class="relative">
          <div :class="{ current: year === currentYear }"></div>
          {{ year }}
        </td>
        <td class="relative">
          {{ title }}
          <div v-if="title" class="absolute top-0 right-0">
            <div
              @click="toggleMenu(year)"
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
                <base-button  @click="editPlan(_id)" bg-color="#777" color="#fff"
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
  </div>
</template>
<script lang="ts">
interface YearlyPlan {
  _id: string; 
  year: number; 
  title: string; 
  menu: boolean;
  status: string;
  startDate: Date;
}
import planControls from "../../../mixins/planControls"
import {defineComponent} from "vue"
import {mapGetters} from "vuex"
export default defineComponent({
  mixins: [planControls],
  data(){
    return {
      renderedData: [] as YearlyPlan[]
    }
  },
  computed: {
    ...mapGetters({
      data: "plans/yearlyPlans/getPlans" 
    }),
    currentYear():number{
      const date = new Date()
      const currentYear = date.getFullYear() 
      return currentYear
    }
  },
  methods: {
    toggleMenu(year:number) {
      this.renderedData.forEach((y:YearlyPlan,inx:number) => {
        if(y.year === year) {
          this.renderedData.splice(inx,1,{
            ...y,
            menu: !y.menu,
          })
        }
      })
    },
    getData(year: number) {
      (this.$store as any).dispatch("plans/yearlyPlans/fetchPlans",{year})
        .then(()=>{
          this.getYears()
        })
        .catch((err:any)=>{
          if(err.statusCode === 404) {
            this.getYears()
          }
        })
    },
    getYears() {
      this. renderedData = []
      const date = new Date()
      for(let year = 0;year<10;year++){
        const y = +(new Date(date.setFullYear(date.getFullYear())).toLocaleString("en-US",{year:'numeric'})) + (year === 0?0:year)
        const plan = {
          year: y,
          menu: false,
        } as YearlyPlan
        if(this.data.length > 0) {
          this.data.forEach((p:YearlyPlan) => {
            const extractedYear = new Date(p.startDate).getFullYear()
            if(extractedYear === y){
              plan.title = p.title
              plan.status = p.status
              plan._id = p._id
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