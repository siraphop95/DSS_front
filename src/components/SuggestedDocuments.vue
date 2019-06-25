<template>
  <v-container>
    <!-- search -->
    <!-- <v-layout bm-5>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-layout> -->

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
        <tr v-for="auser in filterdDocuments" v-bind:key="auser.id">
          <td class="text-left">{{ auser.title }}</td>
          <td class="text-left">{{ auser.question }}</td>
          <td class="text-left">
            <ul v-for="key in auser.keywords" v-bind:key="key">{{key}}</ul>
          </td>
          <td>
            <!-- <router-link :to="{ path: 'answeredview/' + item._id}"> -->
              <button>view</button>
            <!-- </router-link> -->
          </td>
          <!-- <td class="text-left">
            <router-link :to="{ path: 'updateuser/' + auser._id}">
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
  name: "SuggestedDocuments",
  data() {
    return {
      Documents: [],
      document: {},
      did: "",
      search: ""
    };
  },
  methods: {},
  computed: {
    filterdDocuments: function() {
      if (this.search == "") {
        // return this.Documents.filter(doc => {
        //   return doc.title.match("");
        // });
        //this.search=""
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
    axios
      .get("https://logical-river-244214.appspot.com/documents")
      .then(response => {
        this.Documents = response.data;

        axios
          .get(
            "https://logical-river-244214.appspot.com/documents/" +
              this.$route.params.docId
          )
          .then(response => {
            this.document = response.data;

            //Remove current document from Documents
            var currentId = this.document._id;
            this.Documents = this.Documents.filter(function(doc) {
              return doc._id != currentId;
            });
            var key = "";

            if (typeof this.document.keywords !== "undefined") {
              for (var i = 0; i < this.document.keywords.length; i++) {
                key += this.document.keywords[i] + " ";
              }
            }

            this.search = this.document.title + " " + this.document.question + " " + key;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>