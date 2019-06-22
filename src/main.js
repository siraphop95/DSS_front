// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VeeValidate from 'vee-validate'


window.token = localStorage.getItem('token');

window.axios = axios
//window.axios.defaults.baseURL='http://weblloapi.dev'
window.axios.defaults.params = { api_token: window.token }

Vue.use(Vuetify)
Vue.use(VeeValidate);
Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      globalUrl:'global'
    }
  }
})


window.Event = new Vue;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
