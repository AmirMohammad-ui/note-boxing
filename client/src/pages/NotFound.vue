<template>
  <div>
    <h1>Page You're Looking For Did Not Found.</h1> 
    <base-button @click="goHome" bg-color="#777" color="white" class="mx-auto mt-5">
      <span class="pb-1 text-2xl font-extralight">Back To Home</span>
    </base-button>
  </div>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/")
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
div h1 {
  @apply text-4xl;
}
</style>