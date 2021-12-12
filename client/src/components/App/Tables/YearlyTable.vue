<template>
  <div class="mb-14">
    <table class="w-full box">
      <tr>
        <th class="w-1/12">Years</th>
        <th>Plans</th>
      </tr>
      <tr v-for="(plans,i) in renderedData" :key="i">
        <td class="relative">
          <div :class="{ current: plans[0].year === currentYear }"></div>
          {{ plans[0].year }}
        </td>
        <td v-for="{title,_id,menu,image} in plans" :key="_id" class="relative flex">
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
  watch: {
    data() {
      this.getYears()
    }
  },
  computed: {
    ...mapGetters({
      data: "plans/getYearlyPlans" 
    }),
    currentYear():number{
      const date = new Date()
      const currentYear = date.getFullYear() 
      return currentYear
    }
  },
  methods: {
    toggleMenu(id:string) {
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
    img(img:string):any {
      return require("../../../../../server/uploads/images/"+img)
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
      this.renderedData = [];
      for (let year = 1; year <= 10; year++) {
        const d = new Date()
        const y = d.getFullYear() + (year!==1?year: 0);
        const plan = { menu: false } as any;
        plan.year = y;
        plan.menu = false;
        if(this.data[y]) {
          let plansWithSameDate:any = [];
          this.data[y].forEach((p:any) => {
            const pl = { menu: false } as any;
            pl.year = y;
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
    }
  },
  mounted() {
    this.getData(this.currentYear)
  }
})
</script>