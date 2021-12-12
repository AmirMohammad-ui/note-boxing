import axios from "../../util/axios";

import currentPlans from "./CurrentPlans/index";
import dailyPlans from "./Tables/Daily/index";
import monthlyPlans from "./Tables/Monthly/index";
import yearlyPlans from "./Tables/Yearly/index";

enum PlanTypes {
  TODAY = "todayPlans",
  CURMONTH = "currentMonthPlans",
  CURYEAR = "currentYearPlans",
  DAILY = "dailyPlans",
  MONTHLY = "monthlyPlans",
  YEARLY = "yearlyPlans",
}

interface State {
  plans: {
    [PlanTypes.TODAY]: any[];
    [PlanTypes.CURMONTH]: any[];
    [PlanTypes.CURYEAR]: any[];
    [PlanTypes.DAILY]: any[];
    [PlanTypes.MONTHLY]: any[];
    [PlanTypes.YEARLY]: any[];
  };
}
export default {
  namespaced: true,
  modules: {
    currentPlans,
    dailyPlans,
    monthlyPlans,
    yearlyPlans,
  },
  state: {
    plans: {
      [PlanTypes.TODAY]: [],
      [PlanTypes.CURMONTH]: [],
      [PlanTypes.CURYEAR]: [],
      [PlanTypes.DAILY]: [],
      [PlanTypes.MONTHLY]: [],
      [PlanTypes.YEARLY]: [],
    },
  },
  getters: {
    getTodayPlans: ({ plans }: any) => {
      return plans[PlanTypes.TODAY];
    },
    getCurrentMonthPlans: ({ plans }: any) => {
      return plans[PlanTypes.CURMONTH];
    },
    getCurrentYearPlans: ({ plans }: any) => {
      return plans[PlanTypes.CURYEAR];
    },
    getDailyPlans({ plans }: any) {
      return plans[PlanTypes.DAILY];
    },
    getMonthlyPlans({ plans }: any) {
      return plans[PlanTypes.MONTHLY];
    },
    getYearlyPlans({ plans }: any) {
      return plans[PlanTypes.YEARLY];
    },
  },
  mutations: {
    setToday(state: State, payload: any) {
      state.plans[PlanTypes.TODAY] = payload;
    },
    setCurrentMonth(state: State, payload: any) {
      state.plans[PlanTypes.CURMONTH] = payload;
    },
    setCurrentYear(state: State, payload: any) {
      state.plans[PlanTypes.CURYEAR] = payload;
    },
    setDaily(state: State, payload: any) {
      state.plans[PlanTypes.DAILY] = payload;
    },
    setMonthly(state: State, payload: any) {
      state.plans[PlanTypes.MONTHLY] = payload;
    },
    setYearly(state: State, payload: any) {
      state.plans[PlanTypes.YEARLY] = payload;
    },
  },
  actions: {
    deletePlan({ state, dispatch }: any, payload: string) {
      axios
        .delete("/delete", {
          params: { id: payload },
        })
        .then(({ data: { type } }) => {
          if (type === "daily") {
            dispatch("plans/currentPlans/fetchTodaysPlans", null, {
              root: true,
            });
            dispatch("plans/dailyPlans/fetchPlans", null, { root: true });
          } else if (type === "monthly") {
            dispatch("plans/currentPlans/fetchCurrentMonthPlans", null, {
              root: true,
            });
            dispatch("plans/monthlyPlans/fetchPlans", null, { root: true });
          } else if (type === "yearly") {
            dispatch("plans/currentPlans/fetchCurrentYearPlans", null, {
              root: true,
            });
            dispatch("plans/yearlyPlans/fetchPlans", null, { root: true });
          }
        })
        .catch(console.error);
    },
    editPlan() {},
    completePlan() {},
  },
};
