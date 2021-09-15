import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import uploader from 'vue-simple-uploader';

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(uploader);
Vue.use(VueI18n);

// axios.defaults.baseURL = "http://localhost:9527";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
Vue.config.productionTip = false;
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
