<template>
  <div class="m-4">
    <container class="flex-col space-y-4 text-2xl font-light">
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
      <div class="mb-10">
        <the-table :daily="activeTable === 'daily'? true:false"/>
        <the-table :monthly="activeTable === 'monthly'? true:false"/>
        <the-table :yearly="activeTable === 'yearly'? true:false"/>
      </div>
    </container>
    <the-plan 
      left-seperator-text="Today's Plan"
      right-seperator-text="2021/02/21"
      class="mb-10 mt-36"
    />
    <the-plan 
      left-seperator-text="Current Month Plan"
      right-seperator-text="March"
      class="mb-10"
    />
    <the-plan 
      left-seperator-text="Current Year Plan"
      right-seperator-text="2021"
      class="mb-10"
    />
  </div>
</template>

<script>
import TheTable from "@/components/App/TheTable.vue"
import ThePlan from "@/components/App/ThePlan.vue"
export default {
  components: {TheTable,ThePlan},
  data() {
    return {
      activeTable: 'daily'
    };
  },
};
</script>
