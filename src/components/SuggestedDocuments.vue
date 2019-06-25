<template>
  <v-container>
    <!-- search -->
    <v-layout bm-5>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-layout>

    <!-- activities presentation -->
    <!-- <v-card flat v-for="activity in documents" :key="activity.name" :search="search">
      <v-layout row wrap>
        <v-flex xs12 sm5 md5>
          <div class="grey--text">Title</div>
          <div>{{ activity.title }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="grey--text">Detail</div>
          <div>{{ activity.question }}</div>
        </v-flex>
        <v-flex xs6 sm4 md12>
          <div class="grey--text">Respond time</div>
          <div>{{ activity.respondTime }}</div>
        </v-flex>
      </v-layout>
    </v-card>-->
    <table class="table table-stripped table-borderes">
      <thead>
        <tr>
          <th class="center">Title</th>
          <th class="center">Detail</th>
          <th class="center">Key</th>
          <th class="center">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="auser in filterdDocuments" v-bind:key="auser.id">
          <td class="text-left">{{ auser.title }}</td>
          <td class="text-left">{{ auser.question }}</td>
          <td class="text-left">
            <ul v-for="key in auser.keywords" v-bind:key="key">{{key}}</ul>
          </td>

          <td class="text-left">
            <!-- <router-link :to="{ path: 'updateuser/' + auser._id}"> -->
            <!-- Update btn-->
            <!-- <button class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-pencil"></span></button> -->
            <!-- </router-link> -->
          </td>
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
        // console.log(result);
        return result;
      }
    }
  },
  mounted() {
    axios
      .get("https://logical-river-244214.appspot.com/documents")
      .then(response => {
        //console.log(response);
        this.Documents = response.data;

        axios
          .get(
            "https://logical-river-244214.appspot.com/documents/" +
              this.$route.params.docId
          )
          .then(response => {
            this.document = response.data;
            // console.log(this.document);
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

            //console.log(this.documents)
            this.search =
              this.document.title + " " + this.document.question + " " + key;
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