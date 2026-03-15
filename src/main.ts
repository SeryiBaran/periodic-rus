import { createApp } from "vue";
import { createPinia } from "pinia";

import "gardevoir";
import "purecss/build/pure.css";
import "@/css/main.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
