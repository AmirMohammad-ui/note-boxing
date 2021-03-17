import {createApp} from "vue"
import router from "./router/index.js"
import App from "./App.vue"
import BaseInput from "./components/UI/BaseInput.vue"
import BaseTextarea from "./components/UI/BaseTextarea.vue"
import BaseButton from "./components/UI/BaseButton.vue"
import Container from "./components/UI/Container.vue"
import Seperator from "./components/UI/Seperator.vue"
import "./tailwind.css"

const app = createApp(App)
app.component("base-input",BaseInput)
app.component("base-button",BaseButton)
app.component("base-textarea",BaseTextarea)
app.component("container",Container)
app.component("seperator",Seperator)
app.use(router)
app.mount("#app")