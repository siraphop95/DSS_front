<template>
  <v-app>
    <div class="container">
      <h1>List of Users</h1>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for..." v-model="search">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                  Search
                </button>
              </span>
            </div>
            <!-- /input-group -->
          </div>
          <!-- /.col-lg-6 -->
        </div>
        <!-- /.row -->
      </div>
      <table class="table table-stripped table-borderes">
        <thead>
          <tr>
            <th class="center">Username</th>
            <th class="center">First Name</th>
            <th class="center">Last Name</th>
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="auser in filterdUsers" v-bind:key="auser.id">
            <td class="text-left">{{ auser.username }}</td>
            <td class="text-left">{{ auser.firstName }}</td>
            <td class="text-left">{{ auser.lastName }}</td>
            <td class="text-left">
              <!-- Update btn-->
              <router-link :to="{ path: 'updateuser/' + auser._id}">
                <button class="btn btn-xs btn-warning">
                  <span class="glyphicon glyphicon-pencil"></span>
                </button>
              </router-link>
              <!-- Delete btn-->
              <button
                class="btn btn-xs btn-danger"
                data-toggle="modal"
                data-target=".bd-example-modal-sm"
                @click="delUser(auser._id)"
              >
                <span class="glyphicon glyphicon-trash"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Users",
  data() {
    return {
      Users: [],
      uid: "",
      search: ""
    };
  },
  methods: {
    delUser(userId) {
      axios
        .delete("https://logical-river-244214.appspot.com/users/" + userId)
        .then(response => {
          console.log("Delete UserId: " + userId);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    filterdUsers: function() {
      return this.Users.filter(user => {
        return user.firstName.match(this.search);
      });
    }
  },
  mounted() {
    axios
      .get("https://logical-river-244214.appspot.com/users")
      .then(response => {
        console.log(response.data);
        this.Users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
