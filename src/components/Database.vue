<template>
  <v-container>
    <!-- search -->
    <v-layout bm-5>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-layout>

    <!-- activities presentation -->
    <table class="table table-stripped table-borderes">
      <thead>
        <tr>
          <th class="center">Title</th>
          <th class="center">Detail</th>
          <th class="center">Key</th>
          <th class="center">Action</th>
          <!-- <th class="center">Score</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in filterdDocuments" v-bind:key="doc.id">
          <td class="text-left">{{ doc.title }}</td>
          <td class="text-left">{{ doc.question }}</td>
          <td class="text-left">
            <ul v-for="key in doc.keywords" v-bind:key="key">{{key}}</ul>
          </td>
          <td>
            <router-link :to="{ path: '/view2tabs/' + doc._id}">
              <button>view</button>
            </router-link>
          </td>
          <td v-if="user.userType=='admin'">
            <router-link :to="{ path: '/updatedocument/' + doc._id}">
              <button>edit</button>
            </router-link>
          </td>
          <td v-if="user.userType=='admin'">
              <button @click="deleteDoc(doc._id)">delete</button>
          </td>
          <!-- <td class="text-left">
            <router-link :to="{ path: 'updateuser/' + doc._id}">
            Update btn
            <button class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-pencil"></span></button>
            </router-link>
          </td> -->
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import axios from "axios";
import Fuse from "fuse.js";
export default {
  name: "Database",
  data() {
    return {
      Documents: [],
      document: {},
      did: "",
      search: "",
      user:{}
    };
  },
  methods: {
    deleteDoc(docId) {
      console.log("Delete DocId: " + docId);
      axios
        .delete("/documents/" + docId)
        .then(response => {
          console.log("Delete DocId: " + docId);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  computed: {
    filterdDocuments: function() {
      if (this.search == "") {
        return this.Documents.filter(doc => {
          return doc.title.match("");
        });
        this.search=""
      } else {
        var options = {
          shouldSort: true,
          tokenize: true,
          findAllMatches: true,
          //includeScore: true,
          //includeMatches: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 3,
          keys: [
            {
              name: "title",
              weight: 0.15
            },
            {
              name: "question",
              weight: 0.1
            },
            {
              name: "keywords",
              weight: 0.75
            }
          ]
        };

        var fuse = new Fuse(this.Documents, options);
        var result = fuse.search(this.search);
        return result;
      }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    axios
      .get("/documents")
      .then(response => {
        console.log(response.data)
        this.Documents = response.data;
        
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>