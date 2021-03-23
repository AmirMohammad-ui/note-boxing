<template>
  <div>
    <table v-if="daily" class="w-full box">
      <tr>
        <th>Weekdays</th>
        <th>Date</th>
        <th class="w-4/5">Plan</th>
      </tr>
      <tr v-for="{wd_name,wd_date,wd_plan,wd_menu} in thisWeek" :key="wd_name">
        <td class="relative">
          <div :class="{'current':wd_date === currentDate}"></div>
          {{wd_name}}
        </td>
        <td>{{wd_date}}</td>
        <td class="relative">
          {{wd_plan}}
          <div class="absolute top-0 right-0">
            <div @click="toggleMenu(wd_date)" class="absolute" :class="{'info-button':!wd_menu,'info-button-close':wd_menu}">
              <svg v-if="!wd_menu" class="" width="5" height="20" viewBox="0 0 5 20">
              <rect y="0.826782" width="3" height="3" fill="#cdcdcd"/>
              <rect y="8.25244" width="3" height="3" fill="#cdcdcd"/>
              <rect y="15.678" width="3" height="3" fill="#cdcdcd"/>
              </svg>
              <svg v-else width="10" height="10" viewBox="0 0 22 22">
              <path d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z" fill="#cdcdcd"/>
              </svg>
            </div>
            <div v-if="wd_menu" class="plan-info">
              <div class="flex items-center space-x-2">
                <base-button bg-color="#777" color="#fff"><span class="pb-1 text-sm">Edit</span></base-button>
                <base-button bg-color="#00745D" color="#fff"><span class="pb-1 text-sm">Confirm</span></base-button>
                <base-button bg-color="#D63031" color="#fff"><span class="pb-1 text-sm">Delete</span></base-button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table v-else-if="monthly">
      
    </table>
    <table v-else-if="yearly">
      
    </table>
  </div>
</template>

<script>
export default {
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
}),
computed:{
  currentDate(){
    const date = new Date()
    return date.getDate()
  }
},
methods:{
  toggleMenu(date){
    this.thisWeek.forEach((wd,inx) => {
      if(wd.wd_date === date)
        this.thisWeek.splice(inx,1,{
          wd_name: wd.wd_name,
          wd_date: wd.wd_date,
          wd_plan: wd.wd_plan,
          wd_menu: !wd.wd_menu,
        })
    })
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
</style>
