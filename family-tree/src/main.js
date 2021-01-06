import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {store} from './plugins/store'
import 'jquery-ui-dist/jquery-ui';
Vue.use(vuetify)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

