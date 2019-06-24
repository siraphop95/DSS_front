<template>
  <v-app>
    <Navbar v-if="isShow()"/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
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
      // console.log(token);
      window.axios = axios;
      window.axios.defaults.headers.common = {
        Authorization: "Bearer " + window.token
      };
      this.$router.push("/");
      //this.fetchBoardsData();
    });

    Event.$on("logout", () => {
      this.loggedIn = false;
      this.redirectGuestToLogin();
      this.$router.push('/login');
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
      if (this.$router.history.current.path == "/signup") {
      } else if (this.$router.history.current.path == "/forgotpassword") {
      } else if (!token) {
        return this.$router.push("/login");
      } else if (token) {
        let config = {
          headers: {
            Authorization: "Bearer " + token
          }
        };
        axios
          .get("https://logical-river-244214.appspot.com/authentication")
          .then(response => {
            if (response.status == 200) {
              // console.log("authen");
            } else {
              // console.log("fail");
              return this.$router.push("/logout");
            }
          })
          .catch(error => {
            // console.log("err");
            return this.$router.push("/logout");
            console.log(error);
          });
      }
    },
    isShow() {
      if (this.loggedIn == true) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>


