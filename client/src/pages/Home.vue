<template>
  <div class="m-4 -zind-1">
    <div class="mt-10">
      <the-plan 
        left-seperator-text="Today's Plan"
        right-seperator-text="2021/02/21"
        :data="todaysPlan"
      />
      <the-plan 
        left-seperator-text="Current Month Plan"
        right-seperator-text="March"
        :data="currentMonthPlan"
        class="mb-10"
      />
      <the-plan 
        left-seperator-text="Current Year Plan"
        right-seperator-text="2021"
        :data="currentYearPlan"
        class="mb-10"
      />
    </div>
    <container>
      <div class="relative banner">
        <p class="banner-text">Plan It Before Doing Enything</p>
        <img class="box" src="../assets/img-5.jpg" alt="Plan-box">
      </div>
    </container>
    <container class="table-section">
      <div class="flex mt-10 space-x-4">
        <base-button @click="activeTable = 'daily'" :bg-color="activeTable === 'daily'?'#0984E3':'#fff'" :color="activeTable === 'daily'?'#fff':'#0984E3'">
          <span class="pb-1">
            Daily
          </span>
        </base-button>
        <base-button @click="activeTable = 'monthly'" :bg-color="activeTable === 'monthly'?'#0984E3':'#fff'" :color="activeTable === 'monthly'?'#fff':'#0984E3'">
          <span class="pb-1">
            Monthly
          </span>
        </base-button>
        <base-button @click="activeTable = 'yearly'" :bg-color="activeTable === 'yearly'?'#0984E3':'#fff'" :color="activeTable === 'yearly'?'#fff':'#0984E3'">
          <span class="pb-1">
            Yearly
          </span>
        </base-button>
      </div>
      <div class="mb-28">
        <the-table :daily="activeTable === 'daily'? true:false"/>
        <the-table :monthly="activeTable === 'monthly'? true:false"/>
        <the-table :yearly="activeTable === 'yearly'? true:false"/>
      </div>
    </container>
  </div>
</template>

<script>
import TheTable from "@/components/App/TheTable.vue"
import ThePlan from "@/components/App/ThePlan.vue"
export default {
  components: {TheTable,ThePlan},
  data() {
    return {
      activeTable: 'daily',
      todaysPlan: {id: 'p1',startDate: '2020/04/05',finishDate: '2021/04/25',isFinished: false,img: 'img-1',title: 'Finishing the Vue.js course and master it.',description: "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it."},
      currentMonthPlan: {id: 'p2',startDate: '2020/04/05',finishDate: '2021/04/25',isFinished: true,img: 'img-2',title: 'Finishing the Vue.js course and master it.',description: "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it."},
      currentYearPlan: {id: 'p3',startDate: '2020/04/05',finishDate: '2021/04/25',isFinished: false,img: 'img-3',title: 'Finishing the Vue.js course and master it.',description: "Finishing the Vue.js and reading the whole documentaion in vue.js official website and in that way I'll master it."},
    };
  },
};
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
  .banner-text{ 
    @apply absolute w-full text-6xl font-extrabold text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2;
    text-shadow: 0 0 20px #404040;
  }
}
</style>