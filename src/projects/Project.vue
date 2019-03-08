<template src='./Project.html'>
  
</template>

<script>
export default {
  data (){
    return {
      project: {
        company: "",
        industry: "",
        phone_number: "",
        email: "",
        website: "",
        physical: "",
        postal: "",
      }
    }
  },
  computed: {
    token: function() {
      return this.$store.state.key
    }
  },
  methods: {
    createProject() {
      this.$http.post('http://localhost:8000/projects/', 
      {
        company: this.project.company,
        industry: "2f7b0a91-07bd-41af-a377-bc78d0a0bfb9",
        phone_number: this.project.phone_number,
        email: this.project.email,
        website: this.project.website,
        physical: this.project.physical,
        postal: this.project.postal
      },
      {
        withCredentials: true,
          headers: {
            Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
          }
      })
      .then(function (response) {
        this.submitted = true;

        this.$router.push('/');
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>

</style>
