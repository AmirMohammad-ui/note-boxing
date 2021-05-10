<template>
  <div>
    <plan-category 
      left-seperator-text="In Progress Plans"
      center-seperator-text="2021/03/03"/>
    <plan-category 
      left-seperator-text="Most Priority Plan"/>
    <plan-category 
      left-seperator-text="New Category Created"/>
  </div>
  
</template>

<script lang="ts">
import PlanCategory from "../components/App/PlanCategories/PlanCategory.vue"
import {defineComponent} from "vue"
export default defineComponent({
  components: {PlanCategory}
});
</script>

<style lang="scss" scoped></style>
