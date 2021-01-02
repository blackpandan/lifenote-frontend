<template>
  <div >
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success" absolute top>{{ message }}</v-snackbar>
    <v-card class="pa-6 pb-10 pt-10 ma-auto mt-5" width="30em" elevation="4">
      <v-subheader class="subtitle-1 ml-0 pl-0 font-weight-bold">
         Register Your Account
      </v-subheader>
      <v-divider></v-divider>
      <!-- For Login Form -->
      <v-form class="mt-6" ref="form" v-model="formValidity">
        <v-text-field label="email" prepend-inner-icon="email" type="email" :rules="emailRules" v-model="email" outlined class="subtitle-2 tre" dense></v-text-field>
        <v-text-field label="first name" prepend-inner-icon="person" class="mt-5 tre" outlined dense v-model="first_name"></v-text-field>
        <v-text-field label="password" prepend-inner-icon="lock" :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" @click:append="passwordVisibility = !passwordVisibility" counter :rules="passwordRules" :type="passwordVisibility ? 'password' : 'text' " v-model="password" class="mt-5" outlined dense></v-text-field>
        <!-- for the login button-->
        <v-row justify="center" class="mt-2">
        <v-btn dark class="mt-2 purple accent-3 rounded-lg elevation-1" v-on:click="submitForm">
          <span>sign up</span>
        </v-btn>
        </v-row>
        <!-- for the other options -->
        <v-row class="mt-6" justify="center">
          <p>Already Have An Account?</p>
          <v-btn small outlined depressed class="subtitle-2 ml-3 font-weight-regular rounded-lg text-lowercase" to="/login">login</v-btn>
      </v-row>
      </v-form>
    </v-card>

  </div>
</template>

<script>
var axios = require('axios');
export default {
data(){
  return {
    email:"",
    first_name:"",
    password: "",
    token: localStorage.getItem("token_lifenote"),
    snackbar: false,
    message: "",
    timeout: 2000
  }
},
methods: {
  submitForm(){
    var config = {
      url: "https://lifenote-api.herokuapp.com/user/auth/register",
      method: "POST",
      data: {
        "email": this.email,
        "first_name": this.first_name,
        "password": this.password,
      }
    };
    
    axios(config).then(res=>{
      console.log(res);
      this.snackbar = true;
      this.message = "account sucessfully created"
      
      var config = {
        url: "https://lifenote-api.herokuapp.com/auth/token",
        method: "POST",
        data: {
          "username": this.email,
          "password": this.password
        }
      };

      axios(config).then(res=>{
        localStorage.setItem("token_lifenote", res.data.token)
        this.token = res.data.token;
        console.log(res)
        setTimeout(()=>{this.$router.push("/login")}, 2000)
      })
    }).catch(err=>{
      this.snackbar = true;
      this.message = `${err.response.data}`
      console.log("eish")
      console.log(err)
    });

  }
}
}
</script>

<style>

</style>