<template>
  <div>
    <header class="relative">
      <div
        v-if="navIsOpen"
        @click="openNav"
        class="fixed top-0 left-0 w-full h-full"
      ></div>
      <div @click="openNav" class="header--ham lg:hidden box">
        <transition name="fade" mode="out-in">
          <svg v-if="!navIsOpen" width="25" height="19" viewBox="0 0 25 19">
            <path
              d="M1.266 0.000126674C1.1006 -0.00224709 0.936376 0.0287622 0.782884 0.0913521C0.629393 0.153942 0.48969 0.246864 0.371896 0.364719C0.254101 0.482574 0.160565 0.623011 0.0967208 0.777868C0.0328771 0.932725 0 1.09891 0 1.26678C0 1.43464 0.0328771 1.60083 0.0967208 1.75569C0.160565 1.91054 0.254101 2.05098 0.371896 2.16883C0.48969 2.28669 0.629393 2.37961 0.782884 2.4422C0.936376 2.50479 1.1006 2.5358 1.266 2.53343H23.734C23.8994 2.5358 24.0636 2.50479 24.2171 2.4422C24.3706 2.37961 24.5103 2.28669 24.6281 2.16883C24.7459 2.05098 24.8394 1.91054 24.9033 1.75569C24.9671 1.60083 25 1.43464 25 1.26678C25 1.09891 24.9671 0.932725 24.9033 0.777868C24.8394 0.623011 24.7459 0.482574 24.6281 0.364719C24.5103 0.246864 24.3706 0.153942 24.2171 0.0913521C24.0636 0.0287622 23.8994 -0.00224709 23.734 0.000126674H1.266ZM1.266 8.23335C1.1006 8.23098 0.936376 8.26198 0.782884 8.32457C0.629393 8.38717 0.48969 8.48009 0.371896 8.59794C0.254101 8.7158 0.160565 8.85623 0.0967208 9.01109C0.0328771 9.16595 0 9.33214 0 9.5C0 9.66786 0.0328771 9.83405 0.0967208 9.98891C0.160565 10.1438 0.254101 10.2842 0.371896 10.4021C0.48969 10.5199 0.629393 10.6128 0.782884 10.6754C0.936376 10.738 1.1006 10.769 1.266 10.7666H23.734C23.8994 10.769 24.0636 10.738 24.2171 10.6754C24.3706 10.6128 24.5103 10.5199 24.6281 10.4021C24.7459 10.2842 24.8394 10.1438 24.9033 9.98891C24.9671 9.83405 25 9.66786 25 9.5C25 9.33214 24.9671 9.16595 24.9033 9.01109C24.8394 8.85623 24.7459 8.7158 24.6281 8.59794C24.5103 8.48009 24.3706 8.38717 24.2171 8.32457C24.0636 8.26198 23.8994 8.23098 23.734 8.23335H1.266ZM1.266 16.4666C1.1006 16.4642 0.936376 16.4952 0.782884 16.5578C0.629393 16.6204 0.48969 16.7133 0.371896 16.8312C0.254101 16.949 0.160565 17.0895 0.0967208 17.2443C0.0328771 17.3992 0 17.5654 0 17.7332C0 17.9011 0.0328771 18.0673 0.0967208 18.2221C0.160565 18.377 0.254101 18.5174 0.371896 18.6353C0.48969 18.7531 0.629393 18.8461 0.782884 18.9086C0.936376 18.9712 1.1006 19.0022 1.266 18.9999H23.734C23.8994 19.0022 24.0636 18.9712 24.2171 18.9086C24.3706 18.8461 24.5103 18.7531 24.6281 18.6353C24.7459 18.5174 24.8394 18.377 24.9033 18.2221C24.9671 18.0673 25 17.9011 25 17.7332C25 17.5654 24.9671 17.3992 24.9033 17.2443C24.8394 17.0895 24.7459 16.949 24.6281 16.8312C24.5103 16.7133 24.3706 16.6204 24.2171 16.5578C24.0636 16.4952 23.8994 16.4642 23.734 16.4666H1.266Z"
              fill="white"
            />
          </svg>
          <svg v-else width="25" height="19" viewBox="0 0 22 22">
            <path
              d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z"
              fill="white"
            />
          </svg>
        </transition>
      </div>
      <div class="flex items-center justify-between header--linkbox box">
        <div @click="$router.push('/')" class="cursor-pointer header--logo">
          Note Boxing
        </div>
        <div class="flex items-center">
          <ul class="items-center hidden space-x-4 font-light lg:flex">
            <li class="">
              <router-link class="flex items-center justify-center header-link" to="/">
                <svg class="icon" width="13" height="14" viewBox="0 0 13 14">
                  <path
                    d="M0.5 0H12.5V2H0.5V0ZM1.5 6H11.5V8H1.5V6ZM0 12H13V14H0"
                    fill="#777777"
                  />
                </svg>
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
                <svg
                  class="absolute search-icon-position"
                  width="25"
                  height="25"
                  viewBox="0 0 28 28"
                >
                  <path
                    d="M11.271 0C5.06 0 0 5.06 0 11.271C0 17.482 5.06 22.542 11.271 22.542C13.9576 22.542 16.4274 21.5929 18.367 20.0157L25.9928 27.6415C26.1002 27.7534 26.2289 27.8428 26.3713 27.9043C26.5137 27.9659 26.667 27.9984 26.8221 27.9999C26.9772 28.0015 27.1311 27.9721 27.2747 27.9135C27.4183 27.8549 27.5488 27.7682 27.6585 27.6585C27.7682 27.5488 27.8549 27.4183 27.9135 27.2747C27.9721 27.1311 28.0015 26.9772 27.9999 26.8221C27.9984 26.667 27.9659 26.5137 27.9043 26.3713C27.8428 26.2289 27.7534 26.1002 27.6415 25.9928L20.0157 18.367C21.5929 16.4274 22.542 13.9576 22.542 11.271C22.542 5.06 17.482 0 11.271 0ZM11.271 2.33193C16.2217 2.33193 20.21 6.32027 20.21 11.271C20.21 13.6827 19.2588 15.8615 17.7157 17.4667C17.6205 17.5366 17.5366 17.6205 17.4667 17.7157C15.8615 19.2588 13.6827 20.21 11.271 20.21C6.32026 20.21 2.33193 16.2217 2.33193 11.271C2.33193 6.32027 6.32026 2.33193 11.271 2.33193Z"
                    fill="#777777"
                  />
                </svg>
              </div>
            </li>
            <li>
              <base-button @click="showModal" bgColor="#00CEC9">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18 13H13V18C13 18.553 12.552 19 12 19C11.448 19 11 18.553 11 18V13H6C5.448 13 5 12.553 5 12C5 11.447 5.448 11 6 11H11V6C11 5.447 11.448 5 12 5C12.552 5 13 5.447 13 6V11H18C18.552 11 19 11.447 19 12C19 12.553 18.552 13 18 13Z"
                    fill="#fff"
                  />
                </svg>
                <span> New Plan </span>
              </base-button>
            </li>
          </ul>
          <div class="flex items-center mr-2 space-x-2 lg:hidden">
            <img class="profile" src="../../assets/prifile-pic.png" alt="" />
            <span class="hidden font-light xs:block">AmirMuhammad</span>
          </div>
        </div>
      </div>
      <div class="items-center hidden mx-4 mr-12 space-x-2 lg:flex">
        <img class="profile" src="../../assets/prifile-pic.png" alt="" />
        <span class="hidden font-light xs:block">AmirMuhammad</span>
      </div>
      <div class="absolute mobile-nav">
        <ul class="flex-col items-center space-y-4 font-light lg:hidden">
          <transition name="fade-in">
            <li v-if="navIsOpen">
              <router-link class="" to="/plans">
                <base-button class="flex items-center" bgColor="#777" color="#cdcdcd">
                  <svg class="" width="13" height="14" viewBox="0 0 13 14">
                    <path
                      d="M0.5 0H12.5V2H0.5V0ZM1.5 6H11.5V8H1.5V6ZM0 12H13V14H0"
                      fill="#cdcdcd"
                    />
                  </svg>
                  <span> Take A Look At Your Plans </span>
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
                <svg
                  class="absolute search-icon-position"
                  width="25"
                  height="25"
                  viewBox="0 0 28 28"
                >
                  <path
                    d="M11.271 0C5.06 0 0 5.06 0 11.271C0 17.482 5.06 22.542 11.271 22.542C13.9576 22.542 16.4274 21.5929 18.367 20.0157L25.9928 27.6415C26.1002 27.7534 26.2289 27.8428 26.3713 27.9043C26.5137 27.9659 26.667 27.9984 26.8221 27.9999C26.9772 28.0015 27.1311 27.9721 27.2747 27.9135C27.4183 27.8549 27.5488 27.7682 27.6585 27.6585C27.7682 27.5488 27.8549 27.4183 27.9135 27.2747C27.9721 27.1311 28.0015 26.9772 27.9999 26.8221C27.9984 26.667 27.9659 26.5137 27.9043 26.3713C27.8428 26.2289 27.7534 26.1002 27.6415 25.9928L20.0157 18.367C21.5929 16.4274 22.542 13.9576 22.542 11.271C22.542 5.06 17.482 0 11.271 0ZM11.271 2.33193C16.2217 2.33193 20.21 6.32027 20.21 11.271C20.21 13.6827 19.2588 15.8615 17.7157 17.4667C17.6205 17.5366 17.5366 17.6205 17.4667 17.7157C15.8615 19.2588 13.6827 20.21 11.271 20.21C6.32026 20.21 2.33193 16.2217 2.33193 11.271C2.33193 6.32027 6.32026 2.33193 11.271 2.33193Z"
                    fill="#999"
                  />
                </svg>
              </div>
            </li>
          </transition>
          <transition name="fade-in">
            <li v-if="navIsOpen">
              <base-button @click="showModal" class="w-full" bgColor="#777" color="#cdcdcd">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18 13H13V18C13 18.553 12.552 19 12 19C11.448 19 11 18.553 11 18V13H6C5.448 13 5 12.553 5 12C5 11.447 5.448 11 6 11H11V6C11 5.447 11.448 5 12 5C12.552 5 13 5.447 13 6V11H18C18.552 11 19 11.447 19 12C19 12.553 18.552 13 18 13Z"
                    fill="#cdcdcd"
                  />
                </svg>
                <span> New Plan </span>
              </base-button>
            </li>
          </transition>
        </ul>
      </div>
    </header>
    <new-plan @close-modal="closeModal" :is-backdrop-open="isBackdropOpen" :is-dialog-open="isDialogOpen"/>
  </div>
</template>

<script>
import NewPlan from "./NewPlan.vue";
export default {
  components: { NewPlan },
  data() {
    return {
      navIsOpen: false,
      isBackdropOpen: false,
      isDialogOpen: false,
    };
  },
  methods: {
    openNav() {
      this.navIsOpen = !this.navIsOpen;
    },
    showModal() {
      this.isBackdropOpen = !this.isBackdropOpen;
      this.isDialogOpen = !this.isDialogOpen;
    },
    closeModal() {
      this.isBackdropOpen = !this.isBackdropOpen;
      this.isDialogOpen = !this.isDialogOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
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
