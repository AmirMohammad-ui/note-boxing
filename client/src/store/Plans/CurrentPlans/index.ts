import axios from "axios"
axios.defaults.baseURL = "http://localhost:3400/api"

interface State {
  tPlans: any[];
  mPlans: any[];
  yPlans: any[];
}
export default {
  namespaced: true,
  state: () => ({
    tPlans: [],
    mPlans: [],
    yPlans: [],
  }),
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
  actions: {
    fetchTodaysPlans: (context:any) => {
      axios.get("/today")
        .then(res=> {
          context.state.tPlans = res.data.plans
        })
        .catch(()=> {
          context.state.tPlans = []
        })
    },
    fetchCurrentMonthPlans: (context:any) => {
      axios.get("/current-month")
        .then(res=> {
          context.state.mPlans = res.data.plans
        })
        .catch(()=> {
          context.state.mPlans = []
        })
    },
    fetchCurrentYearPlans: (context:any) => {
      axios.get("/current-year")
        .then(res=> {
          context.state.yPlans = res.data.plans
        })
        .catch(()=> {
          context.state.yPlans = []
        })
    },
  }
}