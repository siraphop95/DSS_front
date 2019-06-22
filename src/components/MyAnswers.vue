<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h2>(Supposed to) List Answers belonging to the user</h2>
      <h4>NOW it lists ALL documents</h4>
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
                <router-link :to="{ path: 'documentDetail/' + item._id}">
                  <v-btn flat fab small class="info darken-3">
                    <v-icon>rate_review</v-icon>
                  </v-btn>
                </router-link>
              </tr>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="6"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios"
import Fuse from "fuse.js"
export default {
  name: "Documents",
  data() {
    return {
      Documents: [],
      user: [],
      did: "",
      search: "",
      pagination: {},
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
      var url = "https://logical-river-244214.appspot.com/users/" + docId
      axios
        .delete(url)
        .then(response => {
          console.log("Delete docId: " + docId)
        })
        .catch(error => {
          console.log(error)
        });
      window.location.reload()
    },
    DELETE(id) {
      $("#my-modal").modal("show")
      this.did = id
    }
  },
  computed: {
    pages() {
      console.log("rowsPerPage" + this.pagination.rowsPerPage)
      console.log("length" + this.items.length)

      return this.pagination.rowsPerPage
        ? Math.ceil(this.items.length / this.pagination.rowsPerPage)
        : 0
    },
    filterdDocuments: function() {
      if (this.search == "") {
        return this.Documents.filter(doc => {
          return doc.title.match("")
        });
      } else {
        var options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["title"]
        };
        var fuse = new Fuse(this.Documents, options);
        var result = fuse.search(this.search);
        return result;
      }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("https://logical-river-244214.appspot.com/ans_documents/"+this.user.username)
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