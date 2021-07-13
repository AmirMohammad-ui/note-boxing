<template>
  <div>
    <base-modal
      @close="$emit('close-modal')"
      :show-backdrop="isBackdropOpen"
      :show-dialog="isDialogOpen"
    >
      <div class="relative h-screen">
        <div
          class="absolute w-full transform -translate-y-1/2 bg-white box top-1/2 scroll">
          <header class="px-5 py-4">
            <p class="text-3xl">Register A New Plan</p>
          </header>
          <div class="mt-4">
            <div class="p-4 pb-0">
              <div class="space-y-6 md:space-x-4 md:space-y-0 form">
                <div class="flex-col w-full space-y-7 half-on-md">
                  <base-input focus-on v-model="planName" label="Plan Name" />
                  <base-textarea v-model="description" rows="8" label="Description" />
                </div>
                <div class="flex-col w-full space-y-7 half-on-md">
                  <base-input
                    label="Cover Image"
                    class="w-full"
                    @get-file="getUploadedFiles"
                    type="file"
                    :z-index="58"
                  />
                  <div class="flex space-x-4">
                    <base-input
                      label="Category"
                      v-model="category"
                      :z-index="60"
                      type="options"
                      :options="categories"
                    />
                    <base-button
                      @click="newCategory"
                      bg-color="#00CEC9"
                      class="w-1/5"
                      color="#fff"
                    >
                      <span v-if="!newCategoryField" class="pb-1 mx-auto text-2xl"
                        >New</span
                      >
                      <svg
                        v-else
                        class="mx-auto my-2.5"
                        width="13"
                        height="13"
                        viewBox="0 0 22 22"
                      >
                        <path
                          d="M3.00028 0.000281319C2.74441 0.000281319 2.48825 0.09775 2.29325 0.29325L0.29325 2.29325C-0.09775 2.68425 -0.09775 3.31731 0.29325 3.70731L7.58622 11.0003L0.29325 18.2932C-0.09775 18.6842 -0.09775 19.3173 0.29325 19.7073L2.29325 21.7073C2.68425 22.0983 3.31731 22.0983 3.70731 21.7073L11.0003 14.4143L18.2932 21.7073C18.6832 22.0983 19.3173 22.0983 19.7073 21.7073L21.7073 19.7073C22.0983 19.3163 22.0983 18.6832 21.7073 18.2932L14.4143 11.0003L21.7073 3.70731C22.0983 3.31731 22.0983 2.68325 21.7073 2.29325L19.7073 0.29325C19.3163 -0.09775 18.6832 -0.09775 18.2932 0.29325L11.0003 7.58622L3.70731 0.29325C3.51181 0.09775 3.25616 0.000281319 3.00028 0.000281319Z"
                          fill="white"
                        />
                      </svg>
                    </base-button>
                  </div>
                  <transition name="fade">
                    <DropdownField @get-value="submitNewCategory" v-if="newCategoryField" label="New Category">
                      <svg width="17" height="12" viewBox="0 0 13 8">
                        <path
                          d="M12.4651 0.000193121C12.3302 0.00363171 12.2021 0.0518623 12.108 0.134667L4.16345 6.92777L0.894313 4.13244C0.846444 4.08981 0.789108 4.05578 0.725664 4.03233C0.662219 4.00888 0.593941 3.9965 0.524828 3.9959C0.455715 3.99529 0.387156 4.00649 0.323166 4.02883C0.259177 4.05117 0.201043 4.0842 0.15217 4.12599C0.103297 4.16778 0.0646674 4.21749 0.0385427 4.2722C0.012418 4.32692 -0.000676275 4.38554 2.68896e-05 4.44463C0.000730055 4.50373 0.0152165 4.56211 0.0426377 4.61636C0.070059 4.67061 0.109864 4.71964 0.159721 4.76057L3.79615 7.86995C3.89358 7.95322 4.02569 8 4.16345 8C4.3012 8 4.43332 7.95322 4.53074 7.86995L12.8426 0.76279C12.9177 0.700397 12.9689 0.620068 12.9897 0.53233C13.0104 0.444592 12.9997 0.353539 12.9589 0.271102C12.9181 0.188665 12.8491 0.118691 12.761 0.0703496C12.6729 0.0220081 12.5698 -0.00244557 12.4651 0.000193121Z"
                          fill="white"
                        />
                      </svg>
                    </DropdownField>
                  </transition>
                  <div class="flex w-full space-x-4">
                    <base-input
                      class="w-1/2"
                      :z-index="59"
                      v-model="optionType"
                      type="options"
                      :options="typeOptions"
                      label="Type"
                    />
                    <base-input
                      class="w-1/2"
                      :z-index="57"
                      v-model="priority"
                      type="number"
                      label="Priority"
                    />
                  </div>
                  <div class="flex-col w-full text-2xl space-y-7">
                    <base-input
                      class="w-full"
                      v-model="startDate"
                      :z-index="56"
                      type="date"
                      label="Start"
                    />
                    <base-input
                      class="w-full"
                      type="date"
                      :z-index="55"
                      v-model="endDate"
                      label="End"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 mt-2 space-x-4 text-2xl">
              <base-button @click="sendData" bg-color="#D63031" hover color="#fff">
                <span class="px-5 pb-1">Register</span>
              </base-button>
              <base-button
                @click="$emit('close-modal')"
                bg-color="#D63031"
                hover
                outlined
                color="#D63031"
              >
                <span class="pb-1">Cancel</span>
              </base-button>
              <base-button @click="logValues">Log The values</base-button>
            </div>
          </div>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import DropdownField from "../UI/DropdownField.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["is-backdrop-open", "is-dialog-open"],
  emits: ["close-modal"],
  components: { DropdownField },
  data() {
    return {
      newCategoryField: false,
      optionType: "",
      category: "",
      priority: "",
      startDate: "",
      endDate: "",
      image: "",
      planName: "",
      description: "",
      typeOptions: ["daily", "monthly", "yearly"],
      categories: [],
    };
  },
  methods: {
    submitNewCategory(newCategory:string) {
      this.$axios.post("/new-category", {category: newCategory})
        .then(data => {
          console.log(data)
          this.getCategories()
        })
        .catch(err=> {
          console.log(err.response)
        })
    },
    newCategory() {
      this.newCategoryField = !this.newCategoryField;
    },
    getCategories() {
      this.$axios.get("/categories",{
        params: {
          q: 'Hello'
        }
      })
      .then(res=> {
        this.categories = res.data.categories.map((cat:{name:string;_id:string}) => cat.name)
        
      }) 
      .catch(err=> {
        console.log(err.response)
      })
    },
    logValues() {
      console.log(
        this.optionType,
        this.category,
        this.startDate,
        this.endDate,
        this.image,
        this.description,
        this.planName,
        this.priority
      );
    },
    getUploadedFiles(files: any) {
      this.image = files[0];
    },
    sendData() {
      const data = new FormData();
      data.append("title", this.planName);
      data.append("image", this.image);
      data.append("description", this.description);
      data.append("startDate", this.startDate);
      data.append("endDate", this.endDate);
      data.append("priority", this.priority);
      data.append("category", this.category);
      data.append("type", this.optionType);
      this.$axios
        .post("/new-plan", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.message);
          switch(this.optionType) { 
            case "daily": 
              (this as any).$store.dispatch("plans/currentPlans/fetchTodaysPlans");
              (this as any).$store.dispatch("plans/dailyPlans/fetchPlans");
              break
            case "monthly": 
              (this as any).$store.dispatch("plans/currentPlans/fetchCurrentMonthPlans");
              (this as any).$store.dispatch("plans/monthlyPlans/fetchPlans");
              break
            case "yearly":
              (this as any).$store.dispatch("plans/currentPlans/fetchCurrentYearPlans");
              (this as any).$store.dispatch("plans/yearlyPlans/fetchPlans");
              break
          } 

          this.$emit('close-modal')
        })
        .catch(err => {
          console.log(err.response)
        });
    },
  },
  mounted() {
    this.getCategories()
  }
});
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 80%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}

header {
  @apply flex items-center font-light;
  background: #00cec9;
  color: #fff;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
@media screen and (max-width: 768px) {
  .form {
    display: block;
  }
  .half-on-md {
    width: 100%;
  }
}
@media not screen and (max-width: 768px) {
  .form {
    display: flex;
  }
  .half-on-md {
    width: 50%;
  }
}

.fade-enter-from,
  .fade-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease-out;
  }
  .fade-enter-to,
  .fade-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>
