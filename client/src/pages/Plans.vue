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

<script>
import PlanCategory from "@/components/App/PlanCategory.vue"
export default {
  components: {PlanCategory}
};
</script>

<style lang="scss" scoped></style>
