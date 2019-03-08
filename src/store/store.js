import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Router from '../router/index';

Vue.use(Vuex)
Vue.use(Router)
// const store = new Vuex.Store({
//   state: {
//     key: "",
//     user: "",
//     project: ""
//   },
//   mutations: {
//     saveUser (state, payload) {
//       state.user = payload;
//     },
//     saveToken (state, payload) {
//       state.key = payload;
//     },
//     saveProject (state, payload) {
//       state.project = payload;
//     }
//   }
// })

const store = new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://localhost:8000/auth/obtain_token/',
      refreshJWT: 'http://localhost:8000/auth/refresh_token/'
    }
  },
  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      state.isAuthenticated = isAuthenticated;
      state.authUser= authUser;
      // Vue.set(state, 'authUser', authUser)
      // Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    updateToken(state, newToken){
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
    },
    removeToken(state){
      localStorage.removeItem('t');
      state.jwt = null;
      state.authUser = null;
      state.isAuthenticated = false;
    }
  },
  actions: {  
    refreshToken(){
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response)=>{
            this.commit('updateToken', response.data.token)
          })
        .catch((error)=>{
            console.log(error)
          })
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('token');
      state.jwt = null;
    }
  }
  })

export default store;

