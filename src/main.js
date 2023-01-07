import 'regenerator-runtime/runtime';
import Icon from 'vue-awesome/components/Icon';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/v-calendar';
import { createProvider } from './plugins/vue-apollo';
import './assets/tailwind.css';

Vue.config.productionTip = false;
Vue.component('v-icon', Icon);

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
