<template>
  <div>
    <base-modal
      @close="$emit('close-modal')"
      :show-backdrop="isBackdropOpen"
      :show-dialog="isDialogOpen"
    >
      <div class="bg-white box">
        <header class="px-5 py-4">
          <p class="text-3xl">Register A New Plan</p>
        </header>
        <div class="mt-4">
          <div class="p-4 pb-0">
            <div class="space-y-6 md:space-x-4 md:space-y-0 form">
              <div class="flex-col w-full space-y-7 half-on-md">
                <base-input v-model="planName" label="Plan Name" />
                <base-textarea v-model="description" rows="8" label="Description"/>
              </div>
              <div class="flex-col w-full space-y-7 half-on-md">
                <div class="flex space-x-3">
                <base-input label="Cover Image" @get-file="getUploadedFiles" type="file" :z-index="58"/>
                <base-button bg-color="#00CEC9" color="#fff">
                <span class="pb-1 text-2xl">Pick</span>
                </base-button>
                </div>
                <div class="flex space-x-3">
                <base-input label="Category" v-model="optionType" :z-index="60" type="options" :options="categories"/>
                  <base-button bg-color="#00CEC9" color="#fff">
                    <span class="pb-1 text-2xl">New</span>
                  </base-button>
                </div>
              <div class="flex w-full space-x-4">
                <base-input class="w-1/2" :z-index="59" v-model="category" type="options" :options="typeOptions" label="Type" />
                <base-input class="w-1/2" :z-index="57" v-model="priority" type="Number" label="Priority" />
              </div>
              <div class="flex-col w-full space-y-7">
                <base-input class="w-full uppercase" v-model="startDate" :z-index="56" type="date" label="Start" />
                <base-input class="w-full" type="date" :z-index="55" v-model="endDate" label="End" />
              </div>
              </div>
            </div>
          </div>
          <div class="flex items-center p-4 space-x-4 text-2xl">
            <base-button bg-color="#D63031" hover color="#fff">
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
    </base-modal>
  </div>
</template>

<script>
export default {
  props: ["is-backdrop-open", "is-dialog-open"],
  emits: ["close-modal"],
  data(){
    return {
      optionType: '',
      category: '',
      priority: '',
      startDate: '',
      endDate: '',
      image: null,
      planName: '',
      description: '',
      typeOptions: ['Sport','Course','University','Life',"Long Term Goals"],
      categories: ['Sport','Course','University','Life',"Long Term Goals"],
    }
  },
  methods: {
    logValues(){
      console.log(this.optionType,this.category ,this.startDate,this.endDate,this.image,this.description,this.planName,this.priority)
    },
    getUploadedFiles(files){
      this.image = files[0]
      console.log(files)
      console.log(this.image)
    }
  }
};
</script>

<style lang="scss" scoped>
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
  .half-on-md{
    width: 100%;
  }
}
@media not screen and (max-width: 768px) {
  .form {
    display: flex;
  }
  .half-on-md{
    width: 50%;
  }
}
</style>
