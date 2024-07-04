import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import Toast from "vue-toastification";
import { MotionPlugin } from "@vueuse/motion";
import VueAwesomePaginate from "vue-awesome-paginate";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import "vue-awesome-paginate/dist/style.css";
const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast);
app.use(MotionPlugin);
app.use(VueAwesomePaginate);
app.mount("#app");
