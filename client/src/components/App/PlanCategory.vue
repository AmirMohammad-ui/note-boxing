<template>
  <div>
    <container>
      <seperator left right center>
        <template #left>
          <span class="font-extrabold">{{leftSeperatorText}}</span>
        </template>
        <template #center>
          <span class="hidden sm:block">{{centerSeperatorText}}</span>
        </template>
        <template #right>
          <div class="flex items-center space-x-2">
            <base-button bg-color="#777777" color="#fff">
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
            <base-button bg-color="#777777" color="#fff">
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
    </container>
  </div>
</template>
<script>
export default {
  props: ['centerSeperatorText','leftSeperatorText']
}
</script>
<style lang="scss" scoped>

</style>