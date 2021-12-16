<template>
  <div>
    <div v-if="daily">
      <daily/>
    </div>
    <div v-else-if="monthly">
      <monthly/>

    </div>
    <div v-else-if="yearly">
      <yearly/>
    </div>
  </div>
</template>

<script lang="ts">
import Daily from "./Tables/DailyTable.vue"
import Monthly from "./Tables/MonthlyTable.vue"
import Yearly from "./Tables/YearlyTable.vue"
import {defineComponent} from "vue"
export default defineComponent({
  components: {
    Daily,Monthly,Yearly
  },
props:{
  daily: {
    type: Boolean,
    default:false
  },
  monthly: { 
    type: Boolean,
    default: false
  },
  yearly: {
    type: Boolean,
    default: false
  }
},
})
</script>

<style lang="scss" scpoed>
tr:first-child{
  background: #0984E3;
  color: #fff;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}
th:first-child{
  border-top-left-radius: 3px;
}
th {
  border-right: .5px solid #cdcdcd;
}
th,td {
  padding: 5px 8px;
  border-collapse: collapse;
}
tr:not(:last-child) {
  border-bottom: .5px solid #CDCDCD;
}
tr:not(:first-child):hover{
  background: #F3F1EF;
}
tr td:last-child {
  text-align: left;
  padding-right: 30px;
} 
tr td:first-child {
  @apply capitalize;
}
td:not(:last-child) {
  border-right: .5px solid #CDCDCD;
}
td {
  @apply font-light;
  text-align: center;
}
.current {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #0984E3;
}
.info-button{
  top: .5rem;
  right: 0;
  padding: 0 10px;
  cursor: pointer;
}
.info-button-close {
  top: 1rem;
  right: 0;
  padding: 0 10px;
  cursor: pointer;
}
.plan-info {
  position: absolute;
  top: .4rem;
  right: 30px;
}
.text-blue {
  color: #0984E3;
}
.date-controller {
  @apply mt-4 mb-10;
}
.month-controller {
  @apply flex items-center mt-4 mb-10 space-x-4;
  float: right;
}
@media (max-width: 500px) {
  .date-controller {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @apply space-x-0;
    div:last-child {
      margin-top: 1rem;
    }
  }
}

</style>
