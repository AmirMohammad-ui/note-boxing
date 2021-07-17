import axios from "axios"
axios.defaults.baseURL = "http://localhost:3400/api"

export default {
  namespaced: true,
  actions: {
    fetchPlans(context:any,payload: {year:number,month:number}) {
      let d = new Date()
      let date = new Date(d.getFullYear(),d.getMonth(),1)
      if(payload) {
        date = new Date(payload.year, payload.month, 1)
      }
      return new Promise((resolve, reject) => {
        axios.get("/daily", {
          params: {
            date: date ? date:null 
          }
        }).then(res => {
          context.commit("plans/setDaily",res.data.plans,{ root: true})
          resolve(res.data.message);
        }).catch(err => {
          reject(err.response.data)
          context.commit("plans/setDaily",[],{ root: true})
        })
      })
    }
  }
}
