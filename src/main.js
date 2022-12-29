import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import { AVPlugin } from "vue-audio-visual";

import "./assets/css/main.css";

const app = createApp(App);

app.use(router);
app.use(AVPlugin);

app.mount("#app");

// createApp(App).use(router).mount("#app");
