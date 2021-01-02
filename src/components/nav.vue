<template>
  <nav>
    <!-- For The App Bar -->
    <v-app-bar app dark color="purple accent-3" elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="pa-0"></v-app-bar-nav-icon>

      <v-toolbar-title class="title font-weight-regular">
        <span class="siteName">Life</span>
        <span class="siteName grey--text text--lighten-3 font-weight-normal">Book</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navigation Links -->
      <!-- For Tablets and Other Bigger Screens-->
      <v-toolbar-items class="d-none d-sm-flex">

        <v-btn dark color="purple accent-3" depressed to="/" v-if="isAuthenticated">
          <v-icon left>home</v-icon>
          <span class="font-weight-regular homeText">home</span>
        </v-btn>
        
        <v-btn dark color="purple accent-3" depressed to="/login" v-if="!isAuthenticated">
          <v-icon left>person</v-icon>
          <span class="font-weight-regular loginText">login</span>
        </v-btn>
      
        <v-btn dark color="purple accent-3" depressed to="/logout" v-if="isAuthenticated">
          <v-icon left>logout</v-icon>
          <span class="font-weight-regular loginText">logout</span>
        </v-btn>

      </v-toolbar-items>
      
      <!-- For Mobile Phones And Screen Smaller Than 600px -->
      <v-toolbar-items class="d-flex d-sm-none">
        
        <v-btn icon to="/" v-if="isAuthenticated">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon to="/login" v-if="!isAuthenticated">
          <v-icon>person</v-icon>
        </v-btn>
         <v-btn icon to="/logout" v-if="isAuthenticated">
          <v-icon>logout</v-icon>
        </v-btn>
      
      </v-toolbar-items>
    
    </v-app-bar>

    <!-- For The Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary color="grey lighten-4">
      
      <!-- For The Avatar and User Details (That Are Displayed) -->
      <v-container fluid>
        
        <v-avatar size="96">
          <v-img src="../assets/head.png" alt="hey"></v-img>
        </v-avatar>
        
        <v-card flat class="grey lighten-4">
          <v-card-title class="ma-0 pa-2">anonymous</v-card-title>
          <v-card-subtitle class="pa-0 pa-2" v-if="!isAuthenticated">login@gmail.com</v-card-subtitle>
          <!-- <v-card-subtitle class="pa-0 pa-2" v-else>{{user.email}}</v-card-subtitle> -->
        </v-card>
        <v-divider color="font-size-5 purple accent-3"></v-divider>
      
      </v-container>
      
      <!-- For Navigation Links In The Drawer-->
      <v-list rounded>
        <v-list-item-group>
          
          <v-list-item to="/" v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/projects" v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>assignment</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Projects</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-list-item to="/login" v-if="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/logout" v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      // This controls the drawer visibility
      drawer: false,
      isAuthenticated: false
    };
  },
  // created() {
  //   let token = localStorage.getItem("isAuthenticated_lifenote");
  //   if (token != null || token != undefined){
  //     this.isAuthenticated = true;
  //   }
  // },
  mounted() {
    let token = localStorage.getItem("isAuthenticated_lifenote");
    if (token != null || token != undefined){
      this.isAuthenticated = true;
    }
  }
};
</script>

<style lang="scss" scoped>
/* variable declarations for fonts */
$loginAndHome: 0.95em;

/* For Text */
.siteName {
  font-size: 1em;
}
.loginText{
    font-size: $loginAndHome;
  }
.homeText{
    font-size: $loginAndHome;
  }
</style>