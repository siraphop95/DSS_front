<template>
  <v-app>
    <Navbar v-if="isShow()" />
    <v-content>
      <router-view />
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
      user: [],
      title: "DSS",
      loggedIn: false
    };
  },
  created() {
    this.redirectGuestToLogin();

    Event.$on("login", $user => {
      this.loggedIn = true;
      this.user = $user;
      window.axios = axios;
      window.axios.defaults.headers.common = {
        Authorization: "Bearer " + window.token,
        userid: $user._id
      };

      if (this.user.userType == "questioner") {
        this.$router.push("/myquestions");
      } else if (this.user.userType == "answerer") {
        this.$router.push("/newquestion");
      } else if (this.user.userType == "admin") {
        this.$router.push("/");
      } else {
        this.$router.push("/logout");
      }

      //this.fetchBoardsData();
    });

    Event.$on("logout", () => {
      window.token = null;
      this.loggedIn = false;
      this.redirectGuestToLogin();
      this.$router.push("/login");
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
      window.token = localStorage.getItem("token");

      if (!token) {
        return this.$router.push("/logout");
      } else if (token) {
        var user = JSON.parse(localStorage.getItem("user"));
        window.axios.defaults.headers.common = {
          Authorization: "Bearer " + window.token,
          userid: user._id
        };

        axios
          .get("/authentication")
          .then(response => {
            if (response.status == 200) {
              // console.log("authen");
            } else {
              // console.log("fail");
              return this.$router.push("/logout");
            }
          })
          .catch(error => {
            console.log("err");
            //return this.$router.push("/logout");
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


