import axios from "../../../util/axios"

export default {
  namespaced: true,
  actions: {
    fetchTodaysPlans: ({commit}:any) => {
      axios.get("/today")
        .then(res=> {
          commit("plans/setToday",res.data.plans,{ root: true})
        })
        .catch(()=> {
          commit("plans/setToday",[],{ root: true})
        })
    },
    fetchCurrentMonthPlans: ({commit}:any) => {
      axios.get("/current-month")
        .then(res=> {
          commit("plans/setCurrentMonth",res.data.plans,{ root: true})
        })
        .catch(()=> {
          commit("plans/setCurrentMonth",[],{ root: true})
        })
    },
    fetchCurrentYearPlans: ({commit}:any) => {
      axios.get("/current-year")
        .then(res=> {
          commit("plans/setCurrentYear",res.data.plans,{ root: true})
        })
        .catch(()=> {
          commit("plans/setCurrentYear",[],{ root: true})
        })
    },
  }
}
