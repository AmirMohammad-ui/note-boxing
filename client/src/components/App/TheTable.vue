<template>
  <div>
    <div v-if="daily">
      <table class="w-full box">
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
              <div @click="toggleMenu(wd_date,'daily')" class="absolute" :class="{'info-button':!wd_menu,'info-button-close':wd_menu}">
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
                  <base-button bg-color="#00745D" color="#fff"><span class="pb-1 text-sm">Done</span></base-button>
                  <base-button bg-color="#D63031" color="#fff"><span class="pb-1 text-sm">Delete</span></base-button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="date-controller">
        <div class="flex items-center space-x-4">
          <base-button bg-color="#fff">
            <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z" fill="#0984E3"/>
            </svg>
          </base-button>
          <div class="px-5 py-3 box text-blue">
            <span class="font-light">Month: </span>
            <span class="font-bold">January</span>
          </div>
          <base-button bg-color="#fff">
            <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3"/>
            </svg>
          </base-button>
        </div>
        <div class="flex items-center space-x-4">
          <base-button bg-color="#fff">
            <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z" fill="#0984E3"/>
            </svg>
          </base-button>
          <div class="px-5 py-3 box text-blue">
            <span class="font-light">Year: </span>
            <span class="font-bold">2021</span>
          </div>
          <base-button bg-color="#fff">
            <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3"/>
            </svg>
          </base-button>
        </div>
      </div>
    </div>
    <div v-else-if="monthly">
      <table class="w-full box">
        <tr>
          <th class="w-2/12">Months</th>
          <th>Note</th>
        </tr>
        <tr v-for="{m_name,m_plan,m_menu} in thisMonth" :key="m_name">
          <td class="relative">
            <div :class="{'current':m_name === currentMonth}"></div>
            {{m_name}}
          </td>
          <td class="relative">
            {{m_plan}}
            <div class="absolute top-0 right-0">
              <div @click="toggleMenu(m_name,'monthly')" class="absolute" :class="{'info-button':!m_menu,'info-button-close':m_menu}">
                <svg v-if="!m_menu" class="" width="5" height="20" viewBox="0 0 5 20">
                <rect y="0.826782" width="3" height="3" fill="#cdcdcd"/>
                <rect y="8.25244" width="3" height="3" fill="#cdcdcd"/>
                <rect y="15.678" width="3" height="3" fill="#cdcdcd"/>
                </svg>
                <svg v-else width="10" height="10" viewBox="0 0 22 22">
                <path d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z" fill="#cdcdcd"/>
                </svg>
              </div>
              <div v-if="m_menu" class="plan-info">
                <div class="flex items-center space-x-2">
                  <base-button bg-color="#777" color="#fff"><span class="pb-1 text-sm">Edit</span></base-button>
                  <base-button bg-color="#00745D" color="#fff"><span class="pb-1 text-sm">Done</span></base-button>
                  <base-button bg-color="#D63031" color="#fff"><span class="pb-1 text-sm">Delete</span></base-button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="month-controller">
        <base-button bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z" fill="#0984E3"/>
          </svg>
        </base-button>
        <div class="px-5 py-3 box text-blue">
          <span class="font-light">Year: </span>
          <span class="font-bold">2021</span>
        </div>
        <base-button bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3"/>
          </svg>
        </base-button>
      </div>
    </div>
    <div v-else-if="yearly">
      <table class="w-full box">
        <tr>
          <th class="w-1/12">Years</th>
          <th>Plans</th>
        </tr>
        <tr v-for="{y_number,y_plan,y_menu} in tenYearsAhead" :key="y_number">
          <td class="relative">
            <div :class="{'current':y_number === currentYear}"></div>
            {{y_number}}
          </td>
          <td class="relative">
            {{y_plan}}
            <div class="absolute top-0 right-0">
              <div @click="toggleMenu(y_number,'yearly')" class="absolute" :class="{'info-button':!y_menu,'info-button-close':y_menu}">
                <svg v-if="!y_menu" class="" width="5" height="20" viewBox="0 0 5 20">
                <rect y="0.826782" width="3" height="3" fill="#cdcdcd"/>
                <rect y="8.25244" width="3" height="3" fill="#cdcdcd"/>
                <rect y="15.678" width="3" height="3" fill="#cdcdcd"/>
                </svg>
                <svg v-else width="10" height="10" viewBox="0 0 22 22">
                <path d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z" fill="#cdcdcd"/>
                </svg>
              </div>
              <div v-if="y_menu" class="plan-info">
                <div class="flex items-center space-x-2">
                  <base-button bg-color="#777" color="#fff"><span class="pb-1 text-sm">Edit</span></base-button>
                  <base-button bg-color="#00745D" color="#fff"><span class="pb-1 text-sm">Done</span></base-button>
                  <base-button bg-color="#D63031" color="#fff"><span class="pb-1 text-sm">Delete</span></base-button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="month-controller">
        <base-button bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z" fill="#0984E3"/>
          </svg>
        </base-button>
        <div class="px-5 py-3 box text-blue">
          <span class="font-light">Year: </span>
          <span class="font-bold">2021</span>
        </div>
        <base-button bg-color="#fff">
          <svg class="my-2" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#0984E3"/>
          </svg>
        </base-button>
      </div>
    </div>
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
computed:{
  currentDate(){
    const date = new Date()
    return date.getDate()
  },
  currentMonth(){
    const date = new Date()
    let currentMonth
    const currentMonth_Number = date.getMonth()+1
    this.thisMonth.forEach(m => {
      if(m.m_number === currentMonth_Number) {
        currentMonth = m.m_name
        return
      }
    })
    return currentMonth
  },
  currentYear(){
    const date = new Date()
    const currentYear = date.getFullYear() 
    return currentYear
  }
},
methods:{
  toggleMenu(data,dmy){
    if(dmy === 'daily') {
      this.thisWeek.forEach((wd,inx) => {
        if(wd.wd_date === data)
          this.thisWeek.splice(inx,1,{
            wd_name: wd.wd_name,
            wd_date: wd.wd_date,
            wd_plan: wd.wd_plan,
            wd_menu: !wd.wd_menu,
          })
      })
    } else if (dmy === 'monthly'){
      this.thisMonth.forEach((m,inx) => {
        if(m.m_name === data) {
          this.thisMonth.splice(inx,1,{
            m_name: m.m_name,
            m_plan: m.m_plan,
            m_menu: !m.m_menu,
          })
        }
      })
    } else if (dmy === 'yearly'){
      this.tenYearsAhead.forEach((y,inx) => {
        if(y.y_number === data) {
          this.tenYearsAhead.splice(inx,1,{
            y_number: y.y_number,
            y_plan: y.y_plan,
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
