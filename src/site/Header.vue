<template src="./Header.html"> 
</template>

<script>
export default {
  data (){
    return {
      showDropDown: false,
      user: {},
    }
  },
  mounted(){
    // this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn() {
      if (this.$store.state.isAuthenticated==false){
        this.$router.push('/login');
      }
      else{
        this.user = this.$store.state.authUser;
        console.log(this.user);
      }
    }
  }
};
</script>

<style scoped>
  #drop-item {
    display: block;
    color: #df474f;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }

  .user_name {
    display: block;
    background-color: #4198c4;
    padding-left: 7px;
    padding-right: 7px;
  }

  .logout-menu {
    color: #df474f;
    background-color: #4198c4;
    opacity: 0.8;
    z-index:-1;
    position:relative;
  }
  .app-header {
    z-index:1000;
    position:relative;
  }
</style>
