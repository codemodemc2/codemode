import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

import veProgress from "vue-ellipse-progress";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

let pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import "@/helpers/axios_config.js";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueTippy);
app.use(veProgress);
app.use(Toast, {
	transition: "Vue-Toastification__fade",
	maxToasts: 3,
	newestOnTop: true,
});


app.mount("#app");