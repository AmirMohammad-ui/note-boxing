<template>
  <div class="m-4 -zind-1">
    <div>
      <base-alert error>
        <template #header>
          ERROR
        </template>
        <template #default>
          Something failed during the compilation.
        </template>
      </base-alert>
    </div>
    <div class="mt-10">
      <the-plan
        left-seperator-text="Today's Plan"
        :right-seperator-text="new Date().toLocaleDateString('en-US')"
        :data="todaysPlan"
      />
      <the-plan
        left-seperator-text="Current Month Plan"
        :right-seperator-text="new Date().toLocaleString('en-US',{month: 'long'})"
        :data="currentMonthPlan"
        class="mb-10"
      />
      <the-plan
        left-seperator-text="Current Year Plan"
        :right-seperator-text="new Date().getFullYear()"
        :data="currentYearPlan"
        class="mb-10"
      />
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
import ThePlan from "../components/App/ThePlan.vue";
export default defineComponent({
  components: { TheTable, ThePlan },
  data() {
    return {
      activeTable: "daily",
      todaysPlan: {
        _id: "p1",
        startDate: "2020/04/05",
        endDate: "2021/04/25",
        status: 'in-progress',
        img: "img-1",
        title: "Finishing the Vue.js course and master it.",
        description:
          "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it.",
      },
      currentMonthPlan: {
        _id: "p2",
        startDate: "2020/04/05",
        endDate: "2021/04/25",
        status: 'finished',
        img: "img-2",
        title: "Finishing the Vue.js course and master it.",
        description:
          "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it.",
      },
      currentYearPlan: {
        _id: "p3",
        startDate: "2020/04/05",
        endDate: "2021/04/25",
        status: 'in-progress',
        img: "img-3",
        title: "Finishing the Vue.js course and master it.",
        description:
          "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it.",
      },
    };
  },
  methods: {
    getTodaysPlan() {
      this.$axios("/today")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    getCurrentMonthPlan() {
      this.$axios("/current-month")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    getCurrentYearPlan() {
      this.$axios("/current-year")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
  mounted() {},
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
