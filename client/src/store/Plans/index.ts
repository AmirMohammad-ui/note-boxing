import currentPlans from "./CurrentPlans/index"
import dailyPlans from "./Tables/Daily/index"
import monthlyPlans from "./Tables/Monthly/index"
import yearlyPlans from "./Tables/Yearly/index"

export default {
  namespaced: true,
  modules: {
    currentPlans,
    dailyPlans,
    monthlyPlans,
    yearlyPlans
  },
}