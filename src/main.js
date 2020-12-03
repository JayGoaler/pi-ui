import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueAxios, axios);
Vue.use(ElementUI);

// axios.defaults.baseURL = "http://localhost:9527";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
