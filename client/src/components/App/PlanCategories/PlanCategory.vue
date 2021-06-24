<template>
  <div>
    <container>
      <seperator classes="-z-1" left right center>
        <template #left>
          <span class="font-extrabold">{{leftSeperatorText}}</span>
        </template>
        <template #right>
          <div class="items-center hidden space-x-2 sm:flex">
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
      <div ref="category-plan-items-container" class="plan-items">
        <category-plan-item 
          v-for="category in planCategoriesData" 
          :key="category._id"
          :plan-item-data="category" />
      </div>
    </container>
  </div>
</template>
<script lang="ts">
import CategoryPlanItem from "./CategoryPlanItem.vue"
import {defineComponent} from "vue"
export default defineComponent({
  components: {CategoryPlanItem},
  props: ['centerSeperatorText','leftSeperatorText'],
  data(){
    return {
      planCategoriesData: [
        {_id: 'p1',startDate: '2020/04/05',endDate: '2021/04/25', status: false,image: 'img-1',title: 'Finishing the Vue.js course and master it.',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quisdolorem labore, repellendus necessitatibus ut perspiciatis alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quis dolor sit amet consectetur adipisicing elit. Est nesciunt quis dolor sit amet consectetur adipisicing elit. Est nesciunt quis"},
        {_id: 'p2',startDate: '2020/04/05',endDate: '2021/04/25', status: false,image: 'img-2',title: 'Finishing the JS course and master it.',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quisdolorem labore, repellendus necessitatibus ut perspiciatis alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quis"},
        {_id: 'p3',startDate: '2020/04/05',endDate: '2021/04/25', status: true,image: 'img-3',title: 'Finishing the React.js course and master it.',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quisdolorem labore, repellendus necessitatibus ut perspiciatis alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quis"},
        {_id: 'p4',startDate: '2020/04/05',endDate: '2021/04/25', status: false,image: 'img-4',title: 'Finishing the React.js course and master it.',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quisdolorem labore, repellendus necessitatibus ut perspiciatis alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quis"},
        {_id: 'p5',startDate: '2020/04/05',endDate: '2021/04/25', status: true,image: 'img-5',title: 'Finishing the React.js course and master it.',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quisdolorem labore, repellendus necessitatibus ut perspiciatis alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt quis"},
      ]
    }
  },
  methods: {
    scrollLeft() {
      const planItems = this.$refs['category-plan-items-container']! as HTMLElement
      planItems.scrollBy({behavior:'smooth',left: -250})
    },
    scrollRight() {
      const planItems = this.$refs['category-plan-items-container']! as HTMLElement
      planItems.scrollBy({behavior:'smooth',left: 250})
    },
  },
})
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