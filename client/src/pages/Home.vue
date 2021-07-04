<template>
  <div class="m-4 -zind-1">
    <div>
      <base-alert
        v-if="!isAlertHidden"
        :error="alertType === 'error'"
        :warning="alertType === 'warning'"
        :info="alertType === 'info'"
        :message="alertType === 'message'"
      >
        <template #header><span class="uppercase">{{ alertType }}</span></template>
        <template #default>{{ alertMessage }}</template>
      </base-alert>
    </div>
    <div class="mt-10">
      <ul v-if="todaysPlan.length > 0">
        <li>
          <the-plan
            left-seperator-text="Today's Plan"
            :right-seperator-text="new Date().toLocaleDateString('en-US')"
            :data="todaysPlan"
          />
        </li>
      </ul>  
      <ul v-if="currentMonthPlan.length > 0" class="mt-10">
        <li>
          <the-plan
            left-seperator-text="Current Month Plan"
            :right-seperator-text="new Date().toLocaleString('en-US', { month: 'long' })"
            :data="currentMonthPlan"
            class="mb-10"
          />
        </li>
      </ul>  
      <ul v-if="currentYearPlan.length > 0" class="mt-10">
        <li>
          <the-plan
            left-seperator-text="Current Year Plan"
            :right-seperator-text="new Date().getFullYear()"
            :data="currentYearPlan"
            class="mb-10"
          />
        </li>
      </ul>  
    </div>
    <container>
      <div class="relative banner">
        <p class="banner-text">Plan It Before Doing Enything</p>
        <img class="box" src="../assets/img-5.jpg" alt="Plan-box" />
      </div>
    </container>
    <container class="table-section">
      <div class="flex mt-10 space-x-4">
        <base-button
          @click="activeTable = 'daily'"
          :bg-color="activeTable === 'daily' ? '#0984E3' : '#fff'"
          :color="activeTable === 'daily' ? '#fff' : '#0984E3'"
        >
          <span class="pb-1"> Daily </span>
        </base-button>
        <base-button
          @click="activeTable = 'monthly'"
          :bg-color="activeTable === 'monthly' ? '#0984E3' : '#fff'"
          :color="activeTable === 'monthly' ? '#fff' : '#0984E3'"
        >
          <span class="pb-1"> Monthly </span>
        </base-button>
        <base-button
          @click="activeTable = 'yearly'"
          :bg-color="activeTable === 'yearly' ? '#0984E3' : '#fff'"
          :color="activeTable === 'yearly' ? '#fff' : '#0984E3'"
        >
          <span class="pb-1"> Yearly </span>
        </base-button>
      </div>
      <div class="mb-28">
        <the-table :daily="activeTable === 'daily' ? true : false" />
        <the-table :monthly="activeTable === 'monthly' ? true : false" />
        <the-table :yearly="activeTable === 'yearly' ? true : false" />
      </div>
    </container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheTable from "../components/App/TheTable.vue";
import showAlert from "../mixins/showAlert";
import ThePlan from "../components/App/ThePlan.vue";
export default defineComponent({
  mixins: [showAlert],
  components: { TheTable, ThePlan },
  data() {
    return {
      activeTable: "daily",
      todaysPlan: [],
      currentMonthPlan: [],
      currentYearPlan: [],
    };
  },
  methods: {
    getTodaysPlan() {
      this.$axios
        .get("/today")
        .then((res) => {
          if(res.data.success === 1) {
            this.todaysPlan = res.data.plans
          } else {
            this.showAlert(res.data.message,"error")
          }
        })
        .catch((err) => {
          this.showAlert(err.response.message, "error");
          console.error(err.response);
        });
    },
    getCurrentMonthPlan() {
      this.$axios
        .get("/current-month")
        .then((res) => {
          if (res.data.success === 0) {
            this.showAlert(res.data.message, "error");
            return
          }
          this.currentMonthPlan = res.data.plans
        })
        .catch((err) => {
          this.showAlert(err.response.message, "error");
          console.error(err.response);
        });
    },
    getCurrentYearPlan() {
      this.$axios
        .get("/current-year")
        .then((res) => {
          if(res.data.success === 0) {
            this.showAlert(res.data.message, "error")
            return
          }
          this.currentYearPlan = res.data.plans
        })
        .catch((err) => {
          this.showAlert(err.response.message, "error")
          console.error(err.response);
        });
    },
  },
  created() {
    this.getCurrentYearPlan();
    this.getCurrentMonthPlan();
    this.getTodaysPlan();
  },
  mounted() {
    this.hideAlert(7);
  },
});
</script>
<style lang="scss" scoped>
.table-section {
  @apply flex-col space-y-4 text-2xl font-light;
}
.-zind-1 {
  z-index: -1;
}
.banner {
  width: 100%;
  height: 10rem;
  img {
    width: 100%;
    height: 100%;
  }
  .banner-text {
    @apply absolute w-full text-6xl font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2;
    text-shadow: 0 0 20px #404040;
  }
}
</style>
