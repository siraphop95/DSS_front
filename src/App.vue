<template>
<v-app>
  <Navbar v-if="isShow()" />
  <v-content>
    <router-view/>
  </v-content>
</v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      boards: "",
      user: {
        name: "",
        id: ""
      },
      title: "DSS",
      loggedIn: false
    };
  },
  created() {
    this.redirectGuestToLogin();

    Event.$on("login", $user => {
      this.loggedIn = true;
      this.user = $user;

      this.$router.push('/');
      //this.fetchBoardsData();
    });

    Event.$on("logout", () => {
      this.loggedIn = false;
      this.redirectGuestToLogin();
    });

    if (token) {
      // this.user = JSON.parse(localStorage.getItem("user"))
      this.loggedIn = true;
      //console.log(this.user);
      //console.log(JSON.parse(localStorage.getItem("user")))
      //this.fetchBoardsData();
    }
  },

  methods: {
    redirectGuestToLogin() {
      if(this.$router.history.current.path=='/signup') {
        
      }
      else if(this.$router.history.current.path=='/forgotpassword') {
        
      }
      else if (!token) {
        return this.$router.push("/login");
      }
    },
    isShow(){
      if (this.loggedIn == true){
        return true
      }
      else{
        return false
      }
    }
  }
};
</script>


