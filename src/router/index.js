import Vue from 'vue';
import Router from 'vue-router';
import Login from '../auth/Login';
import Main from '../site/Main';
import site_routes from '../site/routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      component: Main,
      children: site_routes,
    },
  ],
});
