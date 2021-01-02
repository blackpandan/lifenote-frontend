<template>
    <div>
        <p>Are you sure you want to log out</p>
        <v-btn small depressed color="success" v-on:click="logout()">
            <span>yes</span>
        </v-btn>
        <v-btn small depressed color="error" class="ml-3" v-on:click="notLogout()">
            <span>no</span>
        </v-btn>
    </div>
</template>

<script>
export default{

methods: {
logout(){
    localStorage.removeItem("token_lifenote");
    localStorage.removeItem("isAuthenticated_lifenote");
    this.$emit("recant")
    this.$router.push("/login")
},
notLogout(){
this.$router.push("/")
}
},
beforeMount(){
    let token = localStorage.getItem("token_lifenote");
    if (token == null || token == undefined){
        this.$router.push("/login")
    }
}
}
</script>

<style lang="scss" scoped>

</style>