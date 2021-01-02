<template>
  <div >
    <v-snackbar v-model="snackbar" :color="color" absolute top >{{message}}</v-snackbar>
    <v-card class="pa-6 pb-10 pt-10 ma-auto mt-5" width="30em" elevation="4">
      <v-subheader class="subtitle-1 ml-0 pl-0 font-weight-bold">
        Login To Your Account
      </v-subheader>

      <v-divider></v-divider>
      <!-- For Login Form -->
      <v-form class="mt-6" ref="form" v-model="formValidity">
        <v-text-field label="email" prepend-inner-icon="email" type="email" :rules="emailRules" v-model="email" outlined class="subtitle-2 tre mt-9" dense></v-text-field>
        <v-text-field label="password" prepend-inner-icon="lock" :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'" @click:append="passwordVisibility = !passwordVisibility" counter :rules="passwordRules" :type="passwordVisibility ? 'password' : 'text' " v-model="password" class="mt-3" outlined dense></v-text-field>
        <!-- for the login button-->
        <v-row justify="center" class="mt-2">
        <v-btn dark class="mt-2 purple accent-3 rounded-lg elevation-1" v-on:click="submitForm">
          <span>login</span>
        </v-btn>
        </v-row>
        <!-- for the other options -->
        <v-row class="mt-6" justify="center">
          <p>Dont Have An Account?</p>
          <v-btn small outlined depressed class="subtitle-2 ml-3 font-weight-regular rounded-lg text-lowercase" to="/register">register</v-btn>
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
    passwordVisibility: true,
    formValidity: true,
    passwordRules: [
     value => !!value || "Required",
     value => value.length >= 6 || "Password must not be less than 6 digits"

    ],
    emailRules: [
      value => !!value || "Required",
      value => /.@.[\S]/.test(value) || "email is not valid"
    ],
    email: "",
    password: "",
    snackbar: false,
    message: "",
    color: ""
    }
  },
  methods: {
   
    submitForm: function(){
      console.log("started")
    this.formValidity = this.$refs.form.validate();
      if(this.formValidity == true){

        var link = "http://127.0.0.1:8000/auth/token";

        var config = {
          url: link,
          method: "POST",
          data: {
            username: this.email,
            password: this.password
          } 
        }

        axios(config).then(res=>{
          console.log("yeah")
          console.log(res.data)
          let token = res.data.token;
          if (token != null){
            localStorage.removeItem("token_lifenote")
            localStorage.setItem("token_lifenote", token);
            localStorage.removeItem("isAuthenticated_lifenote")
            localStorage.setItem("isAuthenticated_lifenote", true);
          }
          let link = "http://127.0.0.1:8000/user/auth/details"
          let config = {
            url: link,
            method: "POST",
            headers: {
              authorization: `Token ${token}`
            }
          }
            axios(config).then(res=>{
              console.log(res.data);
              this.message = "login sucessfully";
              this.color = "success";
              this.snackbar = true;
              this.$emit("recant");
              this.$router.push("/");
            }).catch(err=>{
              console.log("shit happens")
              console.log(err.response.data.non_field_errors)
              this.message = "login failed check details"
              this.color = "error";
              this.snackbar = true;
            })
        }).catch(err=>{
          console.log("nawaooooo");
          console.log(err);
          this.message = err.response.data.non_field_errors[0];
          this.color = "error";
          this.snackbar = true;
        })

      }else{
        console.log("failure")
      }
    }
  }
}
</script>

<style>
.tre{
  font-size: 2px !important
}

</style>