<template>
  <div>
    <header class="relative">
      <div
        v-if="navIsOpen"
        @click="openNav"
        class="fixed top-0 left-0 z-10 w-full h-full"
      ></div>
      <div @click="openNav" class="header--ham lg:hidden box">
        <transition name="fade" mode="out-in">
          <menu-ham-icon v-if="!navIsOpen"/>
          <menu-close-icon v-else/>
        </transition>
      </div>
      <div class="flex items-center justify-between header--linkbox box">
        <div @click="$router.push('/')" class="cursor-pointer header--logo">
          Note Boxing
        </div>
        <div class="flex items-center">
          <ul class="items-center hidden font-light space-x-4 lg:flex">
            <li class="">
              <router-link
                class="flex items-center justify-center header-link"
                to="/plans"
              >
                <list-icon />
                Take A Look At Your Plans
              </router-link>
            </li>
            <li class="">
              <div class="relative">
                <input
                  type="text"
                  class="font-light box header--input"
                  placeholder="Search For A Plan"
                />
                <search-icon />
              </div>
            </li>
            <li>
              <base-button
                class="mr-1"
                @click="showModal_newPlan"
                bgColor="#00CEC9"
              >
                <rounded-plus-icon />
                <span> New Plan </span>
              </base-button>
            </li>
          </ul>
          <div class="profile-container-ondesktop">
            <img class="profile" src="../../assets/prifile-pic.png" alt="" />
            <span class="hidden font-light xs:block">AmirMuhammad</span>
            <div class="auth-menu box">
              <ul class="flex-col">
                <li class="p-3 cursor-pointer">Profile</li>
                <li @click="showModal_auth" class="p-3 cursor-pointer">
                  Sign Up / Login
                </li>
                <li
                  class="flex items-center p-3 text-red-500 bg-red-100 cursor-pointer space-x-3 logout"
                >
                  <exit-icon />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute mobile-nav">
        <ul class="flex-col items-center font-light space-y-4 lg:hidden">
          <transition name="fade-in">
            <li v-if="navIsOpen">
              <router-link class="" to="/plans">
                <base-button
                  class="flex items-center"
                  bgColor="#777"
                  color="#cdcdcd"
                >
                  <list-icon color="#cdcdcd" />
                  <span class="pb-1"> Take A Look At Your Plans </span>
                </base-button>
              </router-link>
            </li>
          </transition>
          <transition name="fade-in">
            <li v-if="navIsOpen">
              <div class="relative">
                <input
                  type="text"
                  class="font-light box mobile--nav__link"
                  placeholder="Search For A Plan"
                />
                <search-icon />
              </div>
            </li>
          </transition>
          <transition name="fade-in">
            <li v-if="navIsOpen">
              <base-button
                @click="showModal_newPlan"
                class="w-full"
                bgColor="#777"
                color="#cdcdcd"
              >
                <rounded-plus-icon />
                <span class="pb-1"> New Plan </span>
              </base-button>
            </li>
          </transition>
        </ul>
      </div>
    </header>
    <new-plan
      @close-modal="closeModal_newPlan"
      :is-backdrop-open="isBackdropOpen_newPlan"
      :is-dialog-open="isDialogOpen_newPlan"
    />
    <auth-modal
      @close-modal="closeModal_auth"
      :is-backdrop-open="isBackdropOpen_auth"
      :is-dialog-open="isDialogOpen_auth"
    />
  </div>
</template>

<script lang="ts">
import listIcon from "../Icons/ListIcon.vue"
import searchIcon from "../Icons/SearchIcon.vue"
import roundedPlusIcon from "../Icons/RoundedPlusIcon.vue"
import menuHamIcon from "../Icons/MenuHamIcon.vue"
import menuCloseIcon from "../Icons/MenuCloseIcon.vue"
import NewPlan from "./NewPlan.vue";
import AuthModal from "./Auth/TheAuth.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { NewPlan, AuthModal, menuHamIcon, menuCloseIcon ,searchIcon, roundedPlusIcon, listIcon},
  data() {
    return {
      navIsOpen: false,
      isBackdropOpen_newPlan: false,
      isDialogOpen_newPlan: false,
      isBackdropOpen_auth: false,
      isDialogOpen_auth: false,
    };
  },
  methods: {
    openNav() {
      this.navIsOpen = !this.navIsOpen;
    },
    showModal_newPlan() {
      this.isBackdropOpen_newPlan = !this.isBackdropOpen_newPlan;
      this.isDialogOpen_newPlan = !this.isDialogOpen_newPlan;
    },
    closeModal_newPlan() {
      this.isBackdropOpen_newPlan = !this.isBackdropOpen_newPlan;
      this.isDialogOpen_newPlan = !this.isDialogOpen_newPlan;
    },
    showModal_auth() {
      this.isBackdropOpen_auth = !this.isBackdropOpen_auth;
      this.isDialogOpen_auth = !this.isDialogOpen_auth;
    },
    closeModal_auth() {
      this.isBackdropOpen_auth = !this.isBackdropOpen_auth;
      this.isDialogOpen_auth = !this.isDialogOpen_auth;
    },
  },
});
</script>

<style lang="scss" scoped>
.profile-container-ondesktop {
  @apply relative flex items-center mr-2 space-x-2 lg:hidden;
  &:hover .auth-menu {
    display: block;
  }
}
.auth-menu {
  @apply absolute bottom-0 font-light transform translate-y-full right-0 bg-white;
  display: none;
  background-image: url("../../assets/auth.svg");
  background-repeat: no-repeat;
  background-position: top -25px right -35px;
  width: 150px;
  z-index: 1;
  color: #777;
  li:hover {
    background-color: #dfdfdf7c;
  }
  li:first-child:hover {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  li:last-child:hover {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .logout:hover {
    background-color: #e6c9c9;
  }
}
header {
  @apply flex items-center;
  font-size: 1.5rem;
  margin: 1rem;
  color: #777777;
  .header--ham {
    padding: 15px;
    margin: 0 10px 0 0;
    background: #777777;
    color: #777777;
    cursor: pointer;
  }
  .header--linkbox {
    width: 100%;
    padding: 5px;
    background: #ffffff;
  }
  .header--logo {
    @apply font-semibold;
    font-size: 1.7rem;
    margin-left: 5px;
    padding: 7px;
  }
  .header-link {
    padding: 5px 10px;
    margin-right: 3px;
    border-radius: 3px;
  }
  .header-link:hover {
    background: #f1f1f1;
  }
  .header--input {
    padding: 5px 30px 5px 10px;
    background: #f1f1f1;
    transition: all 0.3s;
  }
  .header--input:focus {
    box-shadow: 0px 2px 6px -2px rgba(0, 0, 0, 0.25);
  }
}
.profile {
  background: #777777;
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 100px;
}
.search-icon-position {
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
}
.mobile-nav {
  bottom: -130px;
  left: 0;
  z-index: 10;
}
.mobile--nav__link {
  background: #777;
  color: #cdcdcd;
  padding: 5px 10px;
  width: 100%;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateX(-150%);
}
.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-in-enter-active {
  transition: all 0.3s;
}
.fade-in-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
</style>
