<template>
  <v-app>
    <div class="container">
      <v-alert :value="true" type="success">This is a success alert.</v-alert>

      <v-alert :value="true" type="info">This is a info alert.</v-alert>

      <v-alert :value="true" type="warning">This is a warning alert.</v-alert>

      <v-alert :value="true" type="error">This is a error alert.</v-alert>

      <h1>Welcome to TEST {{user.username}}!</h1>
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
            <th class="center">Title</th>
            <th class="center">Detail</th>
            <th class="center">Extra</th>
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="auser in filterdDocuments" v-bind:key="auser.id">
            <td class="text-left">{{ auser.title }}</td>
            <td class="text-left">{{ auser.questionDetail }}</td>
            <td class="text-left">{{ auser.extraDetail }}</td>

            <td class="text-left">
              <router-link :to="{ path: 'updateuser/' + auser._id}">
                <!-- Update btn-->
                <!-- <button class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-pencil"></span></button> -->
              </router-link>
              <!-- Delete btn-->
              <!-- <button class="btn btn-xs btn-danger" data-toggle="modal" data-target=".bd-example-modal-sm" @click="DELETE(auser._id)"><span class="glyphicon glyphicon-trash"></span></button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/">
        <button class="btn btn-large btn-block btn-success full-width">To User</button>
      </router-link>

      <router-link to="/AddDocument">
        <button class="btn btn-large btn-block btn-success full-width">Compose</button>
      </router-link>

      <div
        class="modal fade bd-example-modal-sm"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">Are you sure?</h1>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Are you sure you want to delete this item?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <router-link to="/">
                <button type="button" class="btn btn-danger" @click="delDocument(did)">Delete</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      Documents: [],
      did: "",
      search: "",
      user: {
        _id: "5aa1020ce2f50ebadb85d97a",
        username: "bobby95",
        password: "123456",
        firstName: "bob",
        lastName: "kkkk",
        token: "fake-jwt-token"
      }
    };
  },
  methods: {
    delDocument(docId) {
      var url = "https://logical-river-244214.appspot.com/users/" + docId;
      axios
        .delete(url)
        .then(response => {
          console.log("Delete docId: " + docId);
        })
        .catch(error => {
          console.log(error);
        });
      window.location.reload();
    },
    DELETE(id) {
      $("#my-modal").modal("show");
      this.did = id;
    }
  },
  computed: {
    filterdDocuments: function() {
      return this.Documents.filter(doc => {
        return doc.title.match(this.search);
      });
    }
  },
  mounted() {
    var url = "https://logical-river-244214.appspot.com/documents/" + this.user.username;
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        this.Documents = response.data;
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
