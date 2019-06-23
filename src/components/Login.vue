<template>
  <v-container fluid fill-height class="back">
    <v-layout column align-center justify-center>
      <v-flex>
        <img src="@/assets/login_logo.png" width="170px">
        <p class="body-1 font-weight-light text-xs-center teal--text">Drug Suggestion Service</p>
      </v-flex>
      <v-flex>
        <v-card width="410px" height="auto" class="elevation-8">
          <v-card-title>
            <v-layout column align-center pt-2>
              <p class="headline">Sign In</p>
              <p class="caption">
                <span>or</span>
                <a href="/signup">create an account</a>
              </p>
            </v-layout>
          </v-card-title>
          <v-card-text class="px-4 py-0">
            <v-form @keyup.enter="logItIn">
              <v-text-field v-model="login.username" label="Username" :error-messages="error_msg" required autofocus></v-text-field>
              <v-text-field v-model="login.password" label="Password" type="password" :error-messages="error_msg" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-3">
            <v-layout wrap py-3 px-0 ma-0>
              <v-flex class="text-xs-right">
                <a href="/forgotpassword">Forgot password?</a></v-flex>
              <v-flex pt-4 xs12>
                <v-btn class="ma-0 info" block round @click="logItIn">Sign In</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login: {
          username: "",
          password: ""
        },
      error_msg: []
    };
  },
  methods: {
    logItIn() {
      axios
        .post(
          "https://logical-river-244214.appspot.com/login",
          this.login
        )
        .then(response => {
          //user not found
          if (response.data.status == 404) {
            console.log(response.data.message);
            this.error_msg="username or password is incorrect"
          }
          //password not found
          else if (response.data.status == 405) {
            console.log(response.data.message);
            this.error_msg="username or password is incorrect"
          }
          //everything pass
          else {
            console.log(response)
            let newToken = response.data.token;
            window.token = newToken;
            let user = response.data.user;
            localStorage.setItem("token", newToken);
            localStorage.setItem("user", JSON.stringify(user));
            window.axios.defaults.params = { api_token: newToken };
            Event.$emit("login", user);
          }
        });
    }
  }
};
</script>

<style>
.back {
  background-image: url("https://images.pond5.com/white-polygons-and-free-space-footage-075635924_prevstill.jpeg");
  background-size: cover;
}
</style>
