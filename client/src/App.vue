<template>
  <div class="mx-auto max-w-screen-2xl body-bg">
    <the-header/>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "@/components/App/TheHeader.vue"
export default {
components:{TheHeader}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
input,button,textarea {
  outline: none;
}
button:focus {
  outline: none;
  border: none;
}
.icon {
  margin-right: 5px;
}
.box {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}
body{
  background: #F5F6FA;
}
@media (min-width:1024px ) {
  html {
    font-size: 12px;
  }
}
@media (min-width:1280px ) {
  html {
    font-size: 14px;
  }
}
</style>