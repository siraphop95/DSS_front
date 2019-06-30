<template>
  <v-container>

    <!-- activities presentation -->
    <v-layout column align-center justify-center>
      <v-flex class="headline indigo--text">My Profile</v-flex>
      <v-card class="elevation-8 mt-3">
        <v-layout row wrap justify-center ma-2 class="text-xs-center">
          <v-flex xs12 md12>
            <div class="indigo--text">Username</div>
            <div>{{ user.username }}</div>
          </v-flex>
          <v-flex xs12 md12>
            <div class="indigo--text">Firstname</div>
            <div>{{ user.firstName }}</div>
          </v-flex>
          <v-flex xs12 md12>
            <div class="indigo--text">Lastname</div>
            <div>{{ user.lastName }}</div>
          </v-flex>
          <v-flex xs12 md12>
            <div class="indigo--text">Email</div>
            <div>{{ user.email }}</div>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- dialog -->
      <v-layout text-xs-center wrap class="mt-3"> 
      <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat dark slot="activator" class="indigo" @click="modifyItem(user)">Manage Profile</v-btn>
        <v-card>
          <v-card-text>
            <v-form ref="form" class="px-3">
              <v-text-field v-model="updatedUser.username" label="Username" prepend-icon="edit"></v-text-field>
              <v-text-field v-model="updatedUser.firstName" label="First Name" prepend-icon="edit"></v-text-field>
              <v-textarea v-model="updatedUser.lastName" label="Last Name" prepend-icon="edit"></v-textarea>
              <v-text-field v-model="updatedUser.email" label="Email" prepend-icon="edit"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn flat dark @click="updateUser" class="indigo mx-0 mt-3" :loading="loading">OK</v-btn>
              <v-btn
                flat dark
                @click="dialog=!dialog"
                class="indigo mx-0 mt-3"
                :loading="loading"
              >Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      user: [],
      updatedUser: {
        username: "",
        firstName: "",
        lastName: "",
        email: ""
      },
      loading: false,
      dialog: false,
      i: 0
    };
  },
  methods: {
    modifyItem: function(user) {
      this.updatedUser = Object.assign({}, user);
      this.dialog = true;
    },
    updateUser() {
      this.loading = true;
      let newUser = {
        username: this.updatedUser.username,
        firstName: this.updatedUser.firstName,
        lastName: this.updatedUser.lastName,
        email: this.updatedUser.email
      };
      console.log(newUser);
      axios
        .post(
          "/users/" + this.user._id,
          newUser
        )
        .then(response => {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
      this.$refs.form.reset();
      window.location.reload();
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>