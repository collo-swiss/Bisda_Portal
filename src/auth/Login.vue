<template src="./Login.html"> 
</template>

<script>
import axios from 'axios';
export default {
  data (){
    return {
      user: {
        username: "",
        password: "",
        id: "",
        project: "",
      },
      submitted: false,
      error: false,
    }
  },
  methods: {
    loginUser() {
      // this.$http.post('http://localhost:8000/auth/login/', {
      //   username: this.user.username,
      //   password: this.user.password
      // })
      // .then(function (response) {
      //     console.log(response.data);
      //     console.log(this);
      //     this.submitted = true;

      //     this.saveUser(response.data.user);
      //     this.saveToken(response.data.key);
      //     this.saveProject(response.data.user.project);

      //     this.$router.push('/');         
      // })
      // .catch( function(error) {
      //   console.log(error)
      // });
      axios.post(this.$store.state.endpoints.obtainJWT, {
          email: this.user.username,
          password: this.user.password
        })
        .then((response)=>{
            console.log(response.data)
            this.$store.commit('updateToken', response.data.token);
            this.payload = JSON.parse(atob(response.data.token.split('.')[1]));
            this.user_id = this.payload.user_id
            console.log(this.payload)
            axios({
              method: 'get',
              url : 'http://localhost:8000/users/'+this.user_id+'/',
              withCredentials: true,
              headers: {
                Authorization: `JWT ${this.$store.state.jwt}`,
                'Content-Type': 'application/json'
              }
            })
            .then (data =>{
              console.log(data)
              this.$store.commit('setAuthUser', 
              {authUser: data.data, isAuthenticated: true}
                );
              this.submitted = true;
              this.$router.push('/');
            })
            .catch(error => {
              console.log(error)
            })
          })
        .catch((error)=>{
            console.log(error);
            this.error =true
        })
    }
  }
}
</script>

<style scoped>
.help-block {
  color: #e23333
}
</style>
