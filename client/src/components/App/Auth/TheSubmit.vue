<template>
  <div class="p-3 mt-4">
    <div class="flex flex-col md:space-x-4 md:flex-row">
      <base-input label="First Name" classes="w-full md:w-1/2 mb-6" v-model="fname"/>
      <base-input label="Last Name" classes="w-full md:w-1/2 mb-6" v-model="lname"/>
    </div>
    <base-input label="Email" type="email" classes="mb-6" v-model="email"/>
    <base-input label="Password" type="password" classes="mb-6" v-model="password"/>
    <base-input label="Confirm Password" type="password" v-model="confirmPassword"/>
      <div class="flex justify-end mt-3">
        <base-button @click="signUp" hover bg-color="#00CEC9" color="white" class="w-full">
          <span style="font-size: 1.5rem;" class="w-full px-3 pb-1 text-xl">Sign Up</span>
        </base-button>
      </div>
  </div>
</template>

<script lang="ts">
interface Cridentials {
  fname: string,
  lname: string,
  email: string,
  confirmPassword: string,
  password: string
}
import {defineComponent} from "vue"
export default defineComponent({
  data() {
    return {
      fname: '',
      lname: '',
      email: '',
      confirmPassword: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      const data:Cridentials = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      console.log(data)
      this.$axios.post("/new-user",data)
        .then(res=> {
          console.log("You signed up successfully.")
          console.log(res.data)
        })
        .catch(err=> console.error(err))
    }
  }
})
</script>

<style>

</style>