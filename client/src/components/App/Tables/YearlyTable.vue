<template>
  <div class="mb-14">
    <table class="w-full box">
      <tr>
        <th class="w-1/12">Years</th>
        <th>Plans</th>
      </tr>
      <tr v-for="(plans, i) in renderedData" :key="i">
        <td class="relative">
          <div :class="{ current: plans[0].year === currentYear }"></div>
          {{ plans[0].year }}
        </td>
        <td
          v-for="{ title, _id, menu, image } in plans"
          :key="_id"
          class="relative flex"
        >
          <div class="flex space-x-2">
            <img class="w-8" :src="getImage(image)" :alt="title" />
            <span>
              {{ title }}
            </span>
          </div>
          <div v-if="title" class="absolute top-0 right-0">
            <div
              @click="toggleMenu(_id)"
              class="absolute"
              :class="{ 'info-button': !menu, 'info-button-close': menu }"
            >
            <dot-menu-icon v-if="!menu" />
            <close-icon v-else/>
            </div>
            <div v-if="menu" class="plan-info">
              <div class="flex items-center space-x-2">
                <base-button @click="editPlan(_id)" bg-color="#777" color="#fff"
                  ><span class="pb-1 text-sm">Edit</span></base-button
                >
                <base-button
                  @click="finishedPlan(_id)"
                  bg-color="#00745D"
                  color="#fff"
                  ><span class="pb-1 text-sm">Done</span></base-button
                >
                <base-button
                  @click="deletePlan(_id)"
                  bg-color="#D63031"
                  color="#fff"
                  ><span class="pb-1 text-sm">Delete</span></base-button
                >
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import dotMenuIcon from "../../Icons/DotMenu.vue"
import closeIcon from "../../Icons/CloseIcon.vue"
import planControls from "../../../mixins/planControls";
import getImage from "../../../util/getImage";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

interface YearlyPlan {
  _id: string;
  year: number;
  title: string;
  menu: boolean;
  status: string;
  startDate: Date;
}

export default defineComponent({
  components: {dotMenuIcon, closeIcon},
  mixins: [planControls],
  data() {
    return {
      renderedData: [] as YearlyPlan[],
    };
  },
  watch: {
    data() {
      this.getYears();
    },
  },
  computed: {
    ...mapGetters({
      data: "plans/getYearlyPlans",
    }),
    currentYear(): number {
      const date = new Date();
      const currentYear = date.getFullYear();
      return currentYear;
    },
  },
  methods: {
    getImage,
    toggleMenu(id: string) {
      this.renderedData.forEach((plan: any) => {
        plan.forEach((pl: any, j: number) => {
          if (pl._id === id) {
            (plan as any).splice(j, 1, {
              ...pl,
              menu: !pl.menu,
            });
            return;
          }
        });
      });
    },
    img(name: string): any {
      const images = require.context(
        "../../../../../server/uploads/images",
        false,
        /\.(png|jpe?g|webp|svg)$/
      );
      return images("./" + name);
    },
    getData(year: number) {
      (this.$store as any)
        .dispatch("plans/yearlyPlans/fetchPlans", { year })
        .then(() => {
          this.getYears();
        })
        .catch((err: any) => {
          if (err.statusCode === 404) {
            this.getYears();
          }
        });
    },
    getYears() {
      this.renderedData = [];
      for (let year = 1; year <= 10; year++) {
        const d = new Date();
        const y = d.getFullYear() + (year !== 1 ? year : 0);
        const plan = { menu: false } as any;
        plan.year = y;
        plan.menu = false;
        if (this.data[y]) {
          let plansWithSameDate: any = [];
          this.data[y].forEach((p: any) => {
            const pl = { menu: false } as any;
            pl.year = y;
            pl.menu = false;
            pl.title = p.title;
            pl.status = p.status;
            pl._id = p._id;
            pl.image = p.image;
            plansWithSameDate.push(pl);
          });
          (this.renderedData as any).push(plansWithSameDate);
          plansWithSameDate = [];
        } else {
          (this.renderedData as any).push([plan]);
        }
      }
    },
  },
  mounted() {
    this.getData(this.currentYear);
  },
});
</script>
