<template>
  <div class="text-md-center">
    <h2>Login</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <form @keyup.enter="logItIn">
              <v-text-field v-model="login.username" label="Username" required></v-text-field>

              <v-text-field v-model="login.password" label="Password" type="password" required></v-text-field>
            </form>
          </v-card-text>

          <v-btn class="mb-3" success @click="logItIn">Login</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      login: {
          username: "",
          password: ""
        }
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
          }
          //password not found
          else if (response.data.status == 405) {
            console.log(response.data.message);
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
