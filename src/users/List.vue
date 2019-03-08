<template src="./List.html">
  
</template>
<script>
export default {
  data () {
    return {
      users: [],
      projects: [],
    }
  },
  computed: {
    token: function() {
      return this.$store.state.key
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/projects/',
        withCredentials: true,
        headers: {
          Authorization: 'Bearer '+{token:this.token}
        }
      })
      .then (data =>{
        console.log(data)
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
        this.users = data.body.results
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
