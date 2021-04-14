<template>
  <div>
    <div v-if="daily">
      <daily :data="thisWeek" @toggle-options="toggleMenu"/>
    </div>
    <div v-else-if="monthly">
      <monthly :data="thisMonth" @toggle-options="toggleMenu"/>
    </div>
    <div v-else-if="yearly">
      <yearly :data="tenYearsAhead" @toggle-options="toggleMenu"/>
    </div>
  </div>
</template>

<script>
import Daily from "./Tables/DailyTable.vue"
import Monthly from "./Tables/MonthlyTable.vue"
import Yearly from "./Tables/YearlyTable.vue"
export default {
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
data:()=>({
  thisWeek: [
    {wd_name: 'monday',wd_date: 23,wd_plan:'Finishing the Vue.js Course.',wd_menu: false},
    {wd_name: 'tuesday',wd_date: 24,wd_plan:'Finishing the React.js Course.',wd_menu: false},
    {wd_name: 'wednesday',wd_date: 25,wd_plan:'Finishing the Angular.js Course.',wd_menu: false},
    {wd_name: 'thursday',wd_date: 26,wd_plan:'Finishing the Javascript Course. ',wd_menu: false},
    {wd_name: 'friday',wd_date: 27,wd_plan:'Finishing the GraphQL Course.',wd_menu: false},
    {wd_name: 'saturday',wd_date: 28,wd_plan:'Finishing the NodeJS Course.',wd_menu: false},
    {wd_name: 'sunday',wd_date: 29,wd_plan:'Finishing the MongoDB Course.',wd_menu: false},
  ],
  thisMonth: [
    {m_number: 1,m_name: 'January',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 2,m_name: 'February',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 3,m_name: 'March',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 4,m_name: 'April',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 5,m_name: 'May',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 6,m_name: 'June',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 7,m_name: 'July',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 8,m_name: 'August',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 9,m_name: 'September',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 10,m_name: 'Novermber',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 11,m_name: 'October',m_plan:'Finishing the Vue.js Course.',m_menu: false},
    {m_number: 12,m_name: 'December',m_plan:'Finishing the Vue.js Course.',m_menu: false},
  ],
  tenYearsAhead: [
    {y_number: 2021,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2022,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2022,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2023,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2024,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2025,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2026,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2027,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2028,y_plan:'Finishing the Vue.js Course.',y_menu: false},
    {y_number: 2029,y_plan:'Finishing the Vue.js Course.',y_menu: false},
  ]
}),
methods:{
  toggleMenu(data,dmy){
    if(dmy === 'daily') {
      this.thisWeek.forEach((wd,inx) => {
        if(wd.wd_date === data)
          this.thisWeek.splice(inx,1,{
            ...wd,
            wd_menu: !wd.wd_menu,
          })
      })
    } else if (dmy === 'monthly'){
      this.thisMonth.forEach((m,inx) => {
        if(m.m_name === data) {
          this.thisMonth.splice(inx,1,{
            ...m,
            m_menu: !m.m_menu,
          })
        }
      })
    } else if (dmy === 'yearly'){
      this.tenYearsAhead.forEach((y,inx) => {
        if(y.y_number === data) {
          this.tenYearsAhead.splice(inx,1,{
            ...y,
            y_menu: !y.y_menu,
          })
        }
      })
    }
  }
}
}
</script>

<style lang="scss" scpoed>
tr:first-child{
  background: #0984E3;
  color: white;
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
  @apply float-right mt-4 mb-10 space-x-10;
  display: flex;
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
