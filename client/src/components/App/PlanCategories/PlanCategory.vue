<template>
  <div>
    <container>
      <seperator classes="-z-1" left right center>
        <template #left>
          <span class="font-extrabold">{{leftSeperatorText}}</span>
        </template>
        <template #center>
          <span class="hidden sm:block">{{centerSeperatorText}}</span>
        </template>
        <template #right>
          <div class="flex items-center space-x-2">
            <base-button @click="scrollLeft" bg-color="#777777" color="#fff">
              <svg
                width="10"
                height="12"
                viewBox="0 0 15 17"
              >
                <path
                  d="M-4.15258e-07 8.5L14.25 0.272758L14.25 16.7272L-4.15258e-07 8.5Z"
                  fill="#fff"
                />
              </svg>
              <span class="pb-1 text-xl">Previous</span>
            </base-button>
            <base-button @click="scrollRight" bg-color="#777777" color="#fff">
              <span class="pb-1 text-xl">Next</span>
              <svg width="10" height="12" viewBox="0 0 15 17">
                <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="#fff" />
              </svg>
            </base-button>
          </div>
        </template>
      </seperator>
    </container>
    <container border-left>
      <div :id="planItemsId" class="plan-items">
        <category-plan-item 
          v-for="category in planCategoriesData" 
          :key="category.id"
          :plan-item-data="category" />
      </div>
    </container>
  </div>
</template>
<script>
import CategoryPlanItem from "./CategoryPlanItem.vue"
export default {
  components: {CategoryPlanItem},
  props: ['centerSeperatorText','leftSeperatorText'],
  data(){
    return {
      planCategoriesData: [
        {id: 'p1',startDate: '2020/04/05',finishDate: '2021/04/25',isFinished: false,img: 'img-1',title: 'Finishing the Vue.js course and master it.'},
        {id: 'p2',startDate: '2020/04/05',finishDate: '2021/04/25', isFinished: false,img: 'img-2',title: 'Finishing the JS course and master it.'},
        {id: 'p3',startDate: '2020/04/05',finishDate: '2021/04/25', isFinished: true,img: 'img-3',title: 'Finishing the React.js course and master it.'},
        {id: 'p4',startDate: '2020/04/05',finishDate: '2021/04/25', isFinished: false,img: 'img-4',title: 'Finishing the React.js course and master it.'},
        {id: 'p5',startDate: '2020/04/05',finishDate: '2021/04/25', isFinished: true,img: 'img-5',title: 'Finishing the React.js course and master it.'},
      ]
    }
  },
  computed: {
    planItemsId(){ 
      return `${this.leftSeperatorText.split(" ").join("-")}-id`
    }
  },
  methods: {
    scrollLeft() {
      const planItems = document.getElementById(this.planItemsId)
      planItems.scrollBy({behavior:'smooth',left: -250})
    },
    scrollRight() {
      const planItems = document.getElementById(this.planItemsId)
      planItems.scrollBy({behavior:'smooth',left: 250})
    },
  },
}
</script>
<style lang="scss" scoped>
.plan-items {
  @apply space-x-2 flex overflow-x-scroll;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cdcdcd;  
  }
}
</style>