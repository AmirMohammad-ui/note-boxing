import axios from "axios"
axios.defaults.baseURL = "http://localhost:3400/api"

export default {
  namespaced: true,
  actions: {
    fetchPlans({commit}:any,payload: {year:number}) {
      let date = new Date(new Date().getFullYear(),1,1);
      if(payload) {
        date = new Date(payload.year, 1, 1)
      }
      return new Promise((resolve, reject) => {
        axios.get("/monthly", {
          params: {
            date: date? date:null
          }
        }).then(res => {
          commit("plans/setMonthly",res.data.plans,{ root: true})
          resolve(res.data.message);
        }).catch(err => {
          reject(err.response.data)
          commit("plans/setMonthly",[],{ root: true})
        })
      })
    }
  }
}
