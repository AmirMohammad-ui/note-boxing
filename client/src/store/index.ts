import Vuex from "vuex"
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3400/api"

export default new Vuex.Store({
  state: {
    tPlans: [],
    mPlans: [],
    yPlans: [],
  }, 
  getters: {
    todaysPlan: ({tPlans}:any) => {
      return tPlans
    },
    currentMonthPlan: ({mPlans}:any) => {
      return mPlans
    },
    currentYearPlan: ({yPlans}:any) => {
      return yPlans
    },
  },
  mutations: {
    fetchTodaysPlans: (state) => {
      axios.get("/today")
        .then(res=> {
          state.tPlans = res.data.plans
        })
        .catch(()=> {
          state.tPlans = []
        })
    },
    fetchCurrentMonthPlans: (state) => {
      axios.get("/current-month")
        .then(res=> {
          state.mPlans = res.data.plans
        })
        .catch(()=> {
          state.mPlans = []
        })
    },
    fetchCurrentYearPlans: (state) => {
      axios.get("/current-year")
        .then(res=> {
          state.yPlans = res.data.plans
        })
        .catch(()=> {
          state.yPlans = []
        })
    },
  }
})
