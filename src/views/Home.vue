<template>
  <div>
    <h1 class="subtitle-1 grey--text text--darken-1">Welcome!</h1>
    <!-- snackbar for dialog -->
    <v-snackbar top absolute color="error" v-model="error_snack">
      {{error_msg}}
    </v-snackbar>

    <!-- Action Panel -->
    <div>
      <v-card flat small class="pa-0 px-6 py-2 grey lighten-4 border-radius-lg">
        <v-row class="pa-0">
          <v-card-title class="addEvents__text pa-0 font-weight-regular">Add Events</v-card-title>
          <v-spacer></v-spacer>

          <!-- Dialog For Adding New Event, Project or Reminder -->
          <v-dialog v-model="dialog" width="59vw">
            <template v-slot:activator="{on, attrs}">
              <v-card-actions class="pa-0">
                <v-btn
                  fab
                  x-small
                  dark
                  depressed
                  color="#24F900"
                  class="pa-0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="white--text" color="white">add</v-icon>
                </v-btn>
              </v-card-actions>
            </template>
            
            <!-- Dialog form -->
            <v-card>
              <v-form>
                <v-container fluid>
                  <!-- <v-select :items="items" label="type" dense solo prepend-icon="event" flat></v-select> -->
                  <v-text-field label="title" v-model="title"></v-text-field>
                  <v-textarea rows="3" label="description" v-model="desc"></v-textarea>
                  <v-btn small dark class="purple accent-3" v-on:click="submitAdd()" :loading="load">
                    <span>submit</span>
                  </v-btn>
                </v-container>
              </v-form>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card>

      <!-- Activity Area-->
      <v-expansion-panels focusable class="mt-9" >
        <!--Model For Ongoing Activity-->
        <v-expansion-panel v-for="(project, i) in projects" :key="i" :class="{'topExpansionPanel': i==0, 'pause':project.pause, 'complete':project.done}" >
          
          <v-expansion-panel-header class="expansionPanel__header text-capitalize  font-weight-regular" :disable-icon-rotate="iconRotate(project.done, project.pause)">
            <span :class="{'complete-text': project.done, 'pause-text':project.pause}">{{ project.title }}</span>
            <template v-slot:actions>
              <v-icon color="purple accent-3" v-if="iconShow(project.done, project.pause)">$expand</v-icon>
              <v-icon color="#F9D500" v-if="project.pause">pause</v-icon>
              <v-icon color="#24F900" v-if="project.done">check</v-icon>
            </template>
          </v-expansion-panel-header>
          
          <v-divider></v-divider>
          
          <v-expansion-panel-content>
            
            <v-column>
              <br />
              <p class="expansionPanel__text">{{ project.body }}</p>
              <br />
              <v-row>
                <v-btn small dark color="#24F900" v-on:click="project.done = !project.done" :depressed="project.done" v-if="pauseAndDone(project.done, project.pause)">
                  <span class="expansionPanel__button-text">done</span>
                </v-btn>
                <p class="expansionPanel__text pl-5 grey--text font-weight-bold text-uppercase" v-if="project.done">completed</p>
                 <v-btn small dark color="#F9D500" v-if="project.pause" v-on:click="project.pause = !project.pause">
                  <span class="expansionPanel__button-text">cotinue</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn small dark color="#F9D500" v-on:click="project.pause = !project.pause" v-if="pauseAndDone(project.done, project.pause)">
                  <span class="expansionPanel__button-text">pause</span>
                </v-btn>
                <v-btn small class="error ml-3" v-on:click="del(project.id)" :loading="loading" >
                  <span class="expansionPanel__button-text">delete</span>
                </v-btn>
              </v-row>
            </v-column>
          
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
var axios = require('axios');
export default {
  data() {
    return {
      // controller for dialog visibility
      dialog: false,
      //items for dialog form, type chooser
      items: ["project", "event", "todo"],
      loading: false,
      projects:[ 
        
      ],
      title: "",
      desc: "",
      load: false,
      error_snack: false,
      error_msg: ""
    };
  },
  methods:{
    del(pk){
        function localDel(projects){
          let peo = projects
          for(let i=0; i<peo.length; i++){
          if(peo[i].id == pk){
            projects.splice(i, 1)
            console.log("deleted")
          }
        }
        }
        this.loading = true;
        let token = localStorage.getItem("token_lifenote")
        let config = {
          url: `https://lifenote-api.herokuapp.com/todos/modify/${pk}`,
          method: "DELETE",
          headers: {
            authorization: `Token ${token}`
          }
        }
        axios(config).then(res=>{
          console.log("deleted sucessfully")
          console.log(res)
          localDel(this.projects);
          setTimeout(() => this.loading = false, 1000)
        }).catch(err=>{
          console.log(err)
          setTimeout(() => this.loading = false, 1000)
        })

      
      
    },
   pauseAndDone(done, pause){
      if(!done == false || !pause == false){
        return false
      }
        return true
    },
  iconShow(done, pause){
    
    if(!done == false || !pause == false){
      console.log("show")
      return false
    }else{
      return true
    }
  },
  iconRotate(done, pause){
    
    if(!done == false || !pause == false){
      console.log("pause")
      return true
    }
      return false
    
  },
  getProds(){
     let token = localStorage.getItem("token_lifenote");
    let config = {
      url: "https://lifenote-api.herokuapp.com/todos/all",
      method: "GET",
      headers: {
        authorization: `Token ${token}`
      }
    };
    console.log(config);
    
    axios(config).then(res=>{
      this.projects = res.data;
      console.log(res.data);
      console.log("nawaoo")
      console.log(this.projects)
    }).catch(err=>{
      console.log(err);
    })
  },
  submitAdd(){
    this.load = true;
    let token = localStorage.getItem("token_lifenote")
    let config = {
      url: "https://lifenote-api.herokuapp.com/todos/all",
      method: "POST",
      data: {
        "title":this.title,
        "body":this.desc,
        "done":false,
        "pause":false
      },
      headers: {
        authorization: `Token ${token}`
      }
    };
    axios(config).then(res=>{
      console.log(res);
      this.load = false;
      this.getProds();
      this.dialog = false;
      
      // this.$router.push("/")
    }).catch(err=>{
      console.log(err);
      this.load = false;
      this.error_msg = "Error adding todo";
      this.error_snack = true;
    })
    
  }
  },
  created() {
  this.getProds();

  },
  beforeMount() {
    let token = localStorage.getItem("token_lifenote");
    if (token != null){
      console.log("hehehe")
    }else{
      this.$router.push("/login")
    }
  }
};
</script>

<style lang="scss" scoped>
$green: #24f900;
.topExpansionPanel{
  border-top: 2px solid #d500f9;
}
  .expansionPanel {
    &__header{
    font-size: 1.1em;
  }
  
  &__text {
    font-size: 1em;
  }
  &__button {
    &-text{
    font-size: 0.8em;
    }
  }
  }
.addEvents {
    &__text{
    font-size: 1em;
    }
  }
.pause {
  border-left: 0.2em solid #f9d500;
  &-text {
    color: #f9d500;
  }
}

.complete {
  border-left: 0.2em solid $green;
  // background-color: black;
  &-text {
    color: darken($color: $green, $amount: 8);
  }
}
</style>