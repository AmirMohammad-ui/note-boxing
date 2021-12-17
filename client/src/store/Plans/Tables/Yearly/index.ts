import axios from "../../../../util/axios"

export default {
  namespaced: true,
  actions: {
    fetchPlans({commit}:any,payload: {year:number}) {
      let d = new Date()
      let date = new Date(d.getFullYear(),d.getMonth()+1,1)
      if(payload) {
        date = new Date(payload.year, 1, 1)
      }
      return new Promise((resolve, reject) => {
        axios.get("/yearly", {
          params: {
            date
          }
        }).then(res => {
          commit("plans/setYearly",res.data.plans,{ root: true})
          resolve(res.data.message);
        }).catch(err => {
          reject(err.response.data)
          commit("plans/setYearly",[],{ root: true})
        })
      })
    }
  }
}
