<template src="./Logout.html"> 
</template>

<script>
export default {
  data (){
    return {
    }
  },
  computed: {
    token: function() {
      return this.$store.state.key
    }
  },
  created() {
    this.logOut()
  },
  methods: {
    logOut() {
      this.$http.post('http://localhost:8000/auth/logout/', 
      {},
      {
        withCredentials: true,
          headers: {
            Authorization: `JWT ${this.$store.state.jwt}`,
          }
      })
      .then (data =>{
        console.log(data)
        // this.$router.push('/login');
        this.$store.commit('removeToken');
        this.$store.commit('setAuthUser', 
            {authUser: null, isAuthenticated: false}
          );
        setTimeout( () => this.$router.push({ path: '/login'}), 5000);
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
</style>
