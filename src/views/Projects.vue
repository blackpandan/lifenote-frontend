<template>
  <v-container fluid>
    <v-expansion-panels>
      <v-expansion-panel v-for="(project, i) in projectsin()" :key="i">
        <v-expansion-panel-header v-on:click="project.done = true" class="subtitle-2">{{ project.title }}-{{ i+1 }}</v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <p class="mt-6">
            {{ project.body }}
          </p>
          <p class="grey--text mt-6">time: {{ project.time }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
var axios= require("axios");
export default {
data(){
  return {
    projects: [
    ]
  }
},
methods:{
projectsin(){
  let projects = this.projects;
  let newPro = projects.filter(p => {
    let d = new Date(p.time)
    return p.time = `${d.toUTCString()}`;
  })
  console.log(newPro)
  return newPro;
}
},
created(){
  let token = localStorage.getItem("token_lifenote");
  let config = {
    url : "https://lifenote-api.herokuapp.com/projects/all",
    method: "GET",
    headers: {
      authorization:`Token ${token}`
    }
  };
axios(config).then(res=>{
  this.projects = res.data
}).catch(err=>{
  console.log(`this is the error : ${err}`)
});
},
beforeMount(){
  let token = localStorage.getItem("token_lifenote");
  if (token != null){
    console.log("hehh");
  }else{
    this.$router.push("/login")
  }
}
}
</script>

<style lang="scss" scoped>

</style>