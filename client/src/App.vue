<template>
  <div class="mx-auto max-w-screen-2xl body-bg">
    <the-header/>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" />
      </transition> 
    </router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import TheHeader from "./components/App/TheHeader.vue"
export default defineComponent({
  components:{TheHeader},

})
</script>

<style lang="scss">
.w-vw {
  width: 100vw !important; 
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease-out;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
}
::-webkit-scrollbar {
  width: 5px;
  transition: all .3s;
  &:hover {
    width: 10px;
  }
}
::-webkit-scrollbar-thumb {
  background: #cdcdcd;
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
img {
  object-fit: cover;
  object-position: center;
}
.rounded-small {
  border-radius: 3px;
}
.backdrop {
  background: rgba(0, 0, 0, 0.2);
}
</style>