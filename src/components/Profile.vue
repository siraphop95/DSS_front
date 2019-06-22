<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h1 class="grey--text">My Profile</h1>

      <!-- dialog -->
      <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success" @click="modifyItem(user)">Manage Profile</v-btn>
        <v-card>
          <v-card-text>
            <v-form ref="form" class="px-3">
              <v-text-field v-model="updatedUser.username" label="Username" prepend-icon="edit"></v-text-field>
              <v-text-field v-model="updatedUser.firstName" label="First Name" prepend-icon="edit"></v-text-field>
              <v-textarea v-model="updatedUser.lastName" label="Last Name" prepend-icon="edit"></v-textarea>
              <v-text-field v-model="updatedUser.email" label="Email" prepend-icon="edit"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn flat @click="updateUser" class="success mx-0 mt-3" :loading="loading">OK</v-btn>
              <v-btn
                flat
                @click="dialog=!dialog"
                class="success mx-0 mt-3"
                :loading="loading"
              >Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- activities presentation -->
    </v-layout>
    <v-card flat>
      <v-layout row wrap>
        <v-flex xs12 sm4 md2>
          <div class="grey--text">Name</div>
          <div>{{ user.username }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="grey--text">Status</div>
          <div>{{ user.firstName }}</div>
        </v-flex>
        <v-flex xs6 sm4 md12>
          <div class="grey--text">Content</div>
          <div>{{ user.lastName }}</div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="grey--text">Category</div>
          <div>{{ user.email }}</div>
        </v-flex>
      </v-layout>
    </v-card>
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
        .post("https://logical-river-244214.appspot.com/users/" + this.user._id, newUser)
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