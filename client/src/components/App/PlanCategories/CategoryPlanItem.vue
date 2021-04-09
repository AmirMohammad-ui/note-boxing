<template>
  <div class=" category-plan-container">
    <div class="flex space-x-2 text-sm">
      <base-input
        inputClasses="text-center"
        :z-index="-10"
        readonly
        lable="from"
        :value="planItemData.startDate"
      />
      <base-input
        inputClasses="text-center"
        :z-index="-10"
        readonly
        lable="to"
        :value="planItemData.finishDate"
      />
      <base-input
        inputClasses="text-center "
        classes="rounded-small"
        readonly
        :z-index="-10"
        lable="status"
        :value="planItemData.isFinished ? 'Finished' : 'In Progress'"
        :bg-color="planItemData.isFinished ? '#D63031' : '#00CEC9'"
        color="#fff"
      />
    </div>
    <div class="relative">
      <img
        class="rounded-small box"
        :src="imgSrc"
        alt=""
      />
      <div class="category-plan-controls">
        <base-button w="30px" title="Description" icon bg-color="white">
          <span class="font-sans text-2xl font-semibold description-button">!</span>
        </base-button>
        <base-button w="30px" title="Edit The Plan" icon bg-color="white">
          <svg width="12px" height="12px" viewBox="0 0 12 12">
            <path
              d="M9.96401 0C9.4473 0 8.93059 0.200514 8.52956 0.601542L0.724936 8.40617L0.694087 8.56041L0.154242 11.2751L0 12L0.724936 11.8458L3.43959 11.3059L3.59383 11.2751L11.3985 3.47044C12.2005 2.66838 12.2005 1.4036 11.3985 0.601542C10.9974 0.200514 10.4807 0 9.96401 0ZM9.96401 0.940874C10.2127 0.940874 10.4634 1.05463 10.7044 1.29563C11.1844 1.77571 11.1844 2.29627 10.7044 2.77635L10.3496 3.11568L8.88432 1.65039L9.22365 1.29563C9.46465 1.05463 9.7153 0.940874 9.96401 0.940874ZM8.19023 2.34447L9.65553 3.80977L3.68638 9.77892C3.36247 9.14653 2.85347 8.63753 2.22108 8.31363L8.19023 2.34447ZM1.58869 9.11568C2.18059 9.35476 2.64524 9.81941 2.88432 10.4113L1.26478 10.7352L1.58869 9.11568Z"
              fill="#777777"
            />
          </svg>
        </base-button>
        <base-button w="30px" title="Have You Completed This Plan ?" icon bg-color="#00745D">
          <svg width="14px" viewBox="0 0 13 8">
            <path
              d="M12.4651 0.000193121C12.3302 0.00363171 12.2021 0.0518623 12.108 0.134667L4.16345 6.92777L0.894313 4.13244C0.846444 4.08981 0.789108 4.05578 0.725664 4.03233C0.662219 4.00888 0.593941 3.9965 0.524828 3.9959C0.455715 3.99529 0.387156 4.00649 0.323166 4.02883C0.259177 4.05117 0.201043 4.0842 0.15217 4.12599C0.103297 4.16778 0.0646674 4.21749 0.0385427 4.2722C0.012418 4.32692 -0.000676275 4.38554 2.68896e-05 4.44463C0.000730055 4.50373 0.0152165 4.56211 0.0426377 4.61636C0.070059 4.67061 0.109864 4.71964 0.159721 4.76057L3.79615 7.86995C3.89358 7.95322 4.02569 8 4.16345 8C4.3012 8 4.43332 7.95322 4.53074 7.86995L12.8426 0.76279C12.9177 0.700397 12.9689 0.620068 12.9897 0.53233C13.0104 0.444592 12.9997 0.353539 12.9589 0.271102C12.9181 0.188665 12.8491 0.118691 12.761 0.0703496C12.6729 0.0220081 12.5698 -0.00244557 12.4651 0.000193121Z"
              fill="white"
            />
          </svg>
        </base-button>
        <base-button w="30px" title="Delete The Plan" icon bg-color="#D63031">
          <svg width="12px" height="15px" viewBox="0 0 10 11">
            <path
              d="M4.9922 5.70625e-05C4.85995 0.00199399 4.73392 0.0530134 4.64178 0.141918C4.54963 0.230823 4.4989 0.350349 4.50071 0.474263V0.708169L1.75462 0.708169C1.68848 0.707328 1.62283 0.718807 1.56146 0.741939C1.5001 0.765071 1.44425 0.799396 1.39717 0.842919C1.35008 0.886443 1.31269 0.938298 1.28717 0.995474C1.26165 1.05265 1.24851 1.11401 1.24851 1.17598L0.5064 1.17598C0.440238 1.1751 0.374551 1.18656 0.313154 1.20967C0.251757 1.23279 0.195876 1.26711 0.148759 1.31063C0.101641 1.35416 0.0642259 1.40603 0.0386884 1.46322C0.0131509 1.52041 0 1.58179 0 1.64379C0 1.70579 0.0131509 1.76716 0.0386884 1.82436C0.0642259 1.88155 0.101641 1.93342 0.148759 1.97695C0.195876 2.02047 0.251757 2.05479 0.313154 2.07791C0.374551 2.10102 0.440238 2.11248 0.5064 2.1116L9.4936 2.1116C9.55976 2.11248 9.62545 2.10102 9.68685 2.07791C9.74824 2.05479 9.80412 2.02047 9.85124 1.97695C9.89836 1.93342 9.93577 1.88155 9.96131 1.82436C9.98685 1.76716 10 1.70579 10 1.64379C10 1.58179 9.98685 1.52041 9.96131 1.46322C9.93577 1.40603 9.89836 1.35416 9.85124 1.31063C9.80412 1.26711 9.74824 1.23279 9.68685 1.20967C9.62545 1.18656 9.55976 1.1751 9.4936 1.17598L8.75149 1.17598C8.75149 1.11401 8.73835 1.05265 8.71283 0.995474C8.68731 0.938298 8.64992 0.886443 8.60283 0.842919C8.55575 0.799396 8.4999 0.765071 8.43854 0.741939C8.37717 0.718807 8.31152 0.707328 8.24538 0.708169L5.49929 0.708169V0.474263C5.5002 0.411675 5.48771 0.349552 5.46253 0.291571C5.43736 0.23359 5.40003 0.180932 5.35274 0.136714C5.30546 0.092496 5.24919 0.0576175 5.18726 0.0341441C5.12533 0.0106706 5.059 -0.000920479 4.9922 5.70625e-05ZM0.5064 3.04722L1.40161 10.174C1.46053 10.6451 1.88611 11 2.39239 11L7.60761 11C8.11389 11 8.53898 10.6451 8.59839 10.174L9.4936 3.04722L0.5064 3.04722Z"
              fill="white"
            />
          </svg>
        </base-button>
      </div>
    </div>
    <div class="category-plan-title box">{{planItemData.title}}</div>
  </div>
</template>

<script>
export default {
  props: ['planItemData'],
  data() {
    return {
    };
  },
  computed: {
    imgSrc() {
      return require('../../../assets/'+this.planItemData.img+'.jpg') 
    }
  },
};
</script>

<style lang="scss" scoped>
.description-button {
  color: #777;
}
.category-plan-controls {
  @apply absolute top-0 right-0 m-3 flex-col space-y-2;
  button {
    padding: 2px;
  }
}
img {
  max-height: 160px;
  width: 100%;
}
.category-plan-container {
  @apply pr-3 flex flex-col space-y-2;
  width: 250px;
  min-width: 250px;
  height: 270px;
  min-height: 270px;
  margin-bottom: 10px 0;
}
.category-plan-title {
  @apply p-2 text-xl font-light;
  color: #777;
  background: white;
}
@media (max-width: 1200px) {
  .category-plan-container {
    height: 260px;
    min-height: 260px;
  }
}
@media (max-width: 1000px) {
  .category-plan-container {
    height: 250px;
    min-height: 250px;
    margin-bottom: 0;
  }
}
</style>
