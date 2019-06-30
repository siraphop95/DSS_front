<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h1 class="grey--text">My Profile</h1>

      <!-- dialog -->
      <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success" @click="modifyItem(User)">Manage Profile</v-btn>
        <v-card>
          <v-card-text>
            <v-form ref="form" class="px-3">
              <v-text-field v-model="updatedUser.username" label="Username" prepend-icon="edit"></v-text-field>
              <v-text-field v-model="updatedUser.firstName" label="First Name" prepend-icon="edit"></v-text-field>
              <v-textarea v-model="updatedUser.lastName" label="Last Name" prepend-icon="edit"></v-textarea>
              <v-text-field v-model="updatedUser.email" label="Email" prepend-icon="edit"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn flat  @click="updateUser" class="success mx-0 mt-3" :loading="loading">OK</v-btn>
              <v-btn flat @click="dialog=!dialog" class="success mx-0 mt-3" :loading="loading">Cancel</v-btn>
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
          <div>{{ User.username }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="grey--text">Status</div>
          <div>{{ User.firstName }}</div>
        </v-flex>
        <v-flex xs6 sm4 md12>
          <div class="grey--text">Content</div>
          <div>{{ User.lastName }}</div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="grey--text">Category</div>
          <div>{{ User.email }}</div>
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
      User: [],
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
    submit() {
      this.loading = true;
      const activities = {
        name: this.activities.name,
        status: this.activities.status,
        content: this.activities.content,
        category: this.activities.category,
        author: this.activities.author
      };
      if (this.i==0){
        db.collection("Activity")
        .add(activities)
        .then(() => {
          this.loading = false;
          this.dialog = false;
          console.log("added to db");
        });
      }
      else if (this.i==1){
        db.collection("Activity").doc(this.itemID).update(activities)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            console.log("added to db");
            console.log(activities);
          });
        this.i=0
      }
      this.$refs.form.reset();
    },
     modifyItem: function(user) {
        this.updatedUser = Object.assign({}, user)
        this.dialog = true
        this.i=1
     },
     updateUser () {
      let newUser = {
        username: this.updatedUser.username,
        firstName: this.updatedUser.firstName,
        lastName: this.updatedUser.lastName,
        email: this.updatedUser.email
      }
      console.log(newUser)
      axios.post('/users/' + this.User._id, newUser)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.dialog=false
    }
  },
  mounted() {
    this.User = JSON.parse(localStorage.getItem("user"))
  }
};
</script>