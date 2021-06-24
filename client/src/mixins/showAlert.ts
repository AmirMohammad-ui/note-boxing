
export default {
  data() {
    return {
      isAlertHidden: false,
      alertMessage: '',
      alertType: ''
    }
  },
  methods: {
    showAlert(message:string,type:string) {
      const that = this as any
      that.isAlertHidden = false
      that.alertMessage = message
      that.alertType = type
    },
    hideAlert(d?:number) {
      const that = this as any
      if(d && d>0) {
        setTimeout(() => {
          that.isAlertHidden = true;
        },d * 1000)
      }
    },
  }
}