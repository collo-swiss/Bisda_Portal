<template src="./Unique.html">
  
</template>

<script>
export default {
  data() {
    return {
      custom_fields: {
        index_field1: null,
        index_field2: null,
        prediction_field1: null,
        prediction_field2: null
      }
    }
  },
  beforeCreate(){
    this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/distinct_rows/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })

      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/distinct_ids/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    addFields() {
      this.$http.post('http://localhost:8000/projects/custom_fields/', 
      {
        index_field: this.custom_fields.index_field1,
        index_field2: this.custom_fields.index_field2,
        prediction_field: this.custom_fields.prediction_field1,
        prediction_field2: this.custom_fields.prediction_field2
      },
      {
        withCredentials: true,
          headers: {
            Authorization: `JWT ${this.$store.state.jwt}`
          }
      })
      .then(function (response) {
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

