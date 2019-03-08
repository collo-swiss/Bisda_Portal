<template>
  <v-app id="app" dark>
    <div class="ant-layout-has-sider ant-layout" id="app-main-layout">
      <!-- Page content view -->
      <div class="app-sidebar sidebar-bg-light ant-layout-sider">
        <sidebar></sidebar>
      </div>

      <div class="ant-layout">
          <v-toolbar>
            <!-- Header -->
            <app-header/>
          </v-toolbar>
          <v-content>
            <!-- Main Content View -->
            <router-view/>
          </v-content>
          <!-- Footer -->
          <app-footer></app-footer>
      </div>
    </div>    
  </v-app>
</template>

<script>
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default {
  components: {
    'dashboard': Dashboard,
    'app-header': Header,
    'app-footer': Footer,
    'sidebar': Sidebar
  },
  data (){
    return {
      dialog: true,
      drawer: true,
     }
  },
  props: {
      source: String
  },
  computed: {
    token: function() {
      return this.$store.state.key
    }
  },
  methods: {
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
