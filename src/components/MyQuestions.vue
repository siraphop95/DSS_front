<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h2>List Questions belonging to {{user.username}}</h2>
    </v-layout>

    <!-- search -->
    <v-layout bm-5>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-layout>

    <!-- v-data-table -->
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex md12>
          <v-data-table
            :headers="headers"
            :items="filterdDocuments"
            hide-actions
            :pagination.sync="pagination"
          >
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading text-info text--darken-4" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{ item }">
              <tr>
                <td>{{ item.title }}</td>
                <td>{{ item.question }}</td>
                <td class="text-xs-right">{{ item.respondTime }}</td>
                <router-link :to="{ path: 'view3tabs/' + item._id}">
                  <v-btn flat fab small class="info darken-3">
                    <v-icon>rate_review</v-icon>
                  </v-btn>
                </router-link>
              </tr>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pageLength"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import Fuse from "fuse.js";
export default {
  name: "MyQuestion",
  data() {
    return {
      Documents: [],
      did: "",
      search: "",
      user: [],
      pagination: {
        rowsPerPage: 10
      },
      pageLength: 1,
      headers: [
        {
          sortable: false,
          text: "Title",
          value: "tile"
        },
        {
          sortable: false,
          text: "Detail",
          value: "question"
        },
        {
          sortable: false,
          text: "Respond Time",
          value: "respondTime",
          align: "right"
        },
        {
          sortable: false,
          text: "Action"
        }
      ]
    };
  },
  methods: {
    delDocument(docId) {
      var url = "/users/" + docId;
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
        return doc.title.match(this.search) || doc.question.match(this.search)
      });
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"))

    var url = "/myqn_documents/" + this.user.username
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        this.Documents = response.data
        this.pageLength = Math.ceil(this.Documents.length/10)
      })
      .catch(error => {
        console.log(error)
      });
  }
};
</script>