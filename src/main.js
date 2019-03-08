import VueResource from 'vue-resource';
import Cookies from 'js-cookie';
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import store from './store/store';
import Login from './auth/Login';
import Main from './site/Main';
import Router from './router/index';
import Echarts from 'vue-echarts/components/Echarts';
import Icon from 'vue-awesome/components/Icon';
import { ClientTable } from 'vue-tables-2';

import 'echarts/lib/chart/pie';
import 'vue-awesome/icons';

require('../node_modules/bootstrap-less/bootstrap/bootstrap.less');
require('./less/main.less');

Vue.use(VueResource);
Vue.use(Vuetify);
Vue.use(ClientTable);

Vue.component('icon', Icon);
Vue.component('echart', Echarts);
Vue.component('app-login', Login);
Vue.component('app-main', Main);

Vue.config.productionTip = false;

var csrftoken = Cookies.get('csrftoken');
Vue.http.headers.common['X-CSRFTOKEN'] = csrftoken;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: Router,
  render: h => h(App),
});
