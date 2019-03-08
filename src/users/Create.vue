<template src="./Create.html">
  
</template>
<script>
export default {
  data() {
    return {
      genders: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
        { text: 'Other', value: 'Other' }
      ],
      projects: [],
      user: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        mobile: "",
        id_number: "",
        project: "",
        position: "",
        dob: "",
        gender: "",
        is_admin: "",
        password: "",
        confirm_password: "",
      },
      errors: [],
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
    },
    createUser() {
      this.$http.post('http://localhost:8000/users/create/', 
      {
        first_name: this.user.first_name,
        middle_name: this.user.middle_name,
        last_name: this.user.last_name,
        mobile: this.user.mobile,
        email: this.user.email,
        nationality: this.user.nationality,
        id_number: this.user.id_number,
        project: this.user.project,
        position: this.user.position,
        dob: this.user.dob,
        gender: this.user.gender,
        is_superuser: this.user.is_admin,
        password: this.user.confirm_password,
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

        this.$router.push('/users');
      })
      .catch(function (error) {
        console.log(error)
      });
    },
    checkForm (e) {
      this.errors = [];

      if (!this.confirm_password != this.password) {
        this.errors.push('The password must be repeated exactly.');
      }

      e.preventDefault();
    },
    updateValue() {
      this.$emit('change', this.selected);
    },
  }
}
</script>
<style scoped>

</style>
