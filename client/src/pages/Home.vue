<template>
  <div class="m-4">
    <container class="w-full">
      <seperator right left>
        <template #right><span class="font-extrabold">Today's Plan</span></template>
        <template #left><span class="font-extralight">2021/03/04</span></template>
        <template #center><span class="font-extralight">2021/03/04</span></template>
      </seperator>
    </container>
    <container border-left>
      
    </container>
  </div>
</template>

<script>
export default {
data(){
  return {
    fullname: '',
    description: ""
  }
},
methods:{
  // logTheValue(_,value){
    
  // },
  logValue(){
    console.log(this.fullname)
    console.log(this.description)
  }
}
}
</script>

<style lang="scss" scoped>
  
</style>