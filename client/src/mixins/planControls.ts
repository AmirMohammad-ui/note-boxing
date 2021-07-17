export default {
  methods: {
    editPlan(id:string) {
      console.log("Editing  plan with id: %s ....",id);
    },
    deletePlan(id:string) {
      console.log("Delete  plan with id: %s ....",id);
      (this as any).$store.dispatch("plans/deletePlan",id);
    },
    finishedPlan(id:string) {
      console.log("Finished plan with id: %s ....",id);
    }
  }
}