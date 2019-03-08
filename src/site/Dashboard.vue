<template src="./Dashboard.html"> 
</template>

<script>
export default {
  data (){
    return {
      projects: [],
      projects_count: 0,
      audits_count: 0,
      polls_count: 0,
      respondents_count: 0,
      index: 0,
    }
  },
  mounted(){
    this.checkLoggedIn();
  },

  created() {
    this.fetchData()
  },

  methods: {
    checkLoggedIn() {
      console.log(this.$store.state);
      if (this.$store.state.isAuthenticated==false){
        this.$router.push('/login');
      }
    },
    fetchData() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/projects/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
        this.projects_count = data.body.count
        this.projects = data.body.results
      })
      .catch(error => {
        console.log(error)
      })
      
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/users/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
        this.respondents_count = data.body.count
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
