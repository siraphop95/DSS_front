<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h2>List NEW documents</h2>
    </v-layout>

    <!-- search -->
    <v-layout class="mb-2" justify-center>
      <v-flex xs12 md11>
        <v-text-field v-model="search" append-icon="search" label="Search..." single-line hide-details></v-text-field>
      </v-flex>
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
                <router-link :to="{ path: 'view4tabs/' + item._id}">
                  <v-btn left flat fab small class="info darken-3">
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
import axios from "axios"
export default {
  name: "NewQuestions",
  data() {
    return {
      Documents: [],
      did: "",
      search: "",
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
    filterdDocuments: function() {
      return this.Documents.filter(doc => {
        return doc.title.match(this.search) || doc.question.match(this.search)
      });
    }
  },
  mounted() {
    axios
      .get("https://logical-river-244214.appspot.com/new_questions")
      .then(response => {
        console.log(response.data);
        this.Documents = response.data;
        this.pageLength = Math.ceil(this.Documents.length/10)
        console.log(typeof(this.pageLength))
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>