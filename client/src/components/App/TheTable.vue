<template>
  <div class="">
    <table v-if="daily" class="w-full box">
      <tr>
        <th class="">Weekdays</th>
        <th class="">Date</th>
        <th class="w-4/5">Note</th>
      </tr>
      <tr>
        <td>Monday</td>
        <td>24</td>
        <td>Fisinhing another lecture on computer science</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>25</td>
        <td>Ex mollitia molestiae beatae consequuntur blanditiis?</td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Friday</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Saturday</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Sunday</td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <table v-else-if="monthly">
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <table v-else-if="yearly">
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
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
} 
td:not(:last-child) {
  border-right: .5px solid #CDCDCD;
}
td {
  text-align: center;
}
</style>