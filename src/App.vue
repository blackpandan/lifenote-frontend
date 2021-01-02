<template>
 <v-app>
   <NavBar :key="lets"/>

   <v-main>
     <v-container fluid class="pa-5">
       <router-view v-on:recant="recants()"></router-view>
     </v-container>
   </v-main>
 </v-app>
</template>

<script>
import NavBar from './components/nav.vue'

export default {
  name: 'App',

  components: {
    NavBar
  },

  data: () => ({
    lets : 0
  }
  ),
  methods: {
    recants(){
      this.lets += 1;
    }
  }
};
</script>
<style>
*{
  font-size: 15px ;
}
body{
  font-size: 15px;
}
</style>
