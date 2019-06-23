<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h2 class="grey--text">Document Detail</h2>
      <v-spacer></v-spacer>
      <v-btn dark class="blue">Document Detail</v-btn>
      <router-link :to="{ path: '/suggestedDocuments/' + this.$route.params.docId}">
        <v-btn>Suggested Documents</v-btn>
      </router-link>
      <!-- <v-btn route to="/answer">Write Answer</v-btn> -->
      <router-link :to="{ path: '/answer/' + this.$route.params.docId}">
        <v-btn>Write Answer</v-btn>
      </router-link>
      <router-link :to="{ path: '/answerreview/' + this.$route.params.docId}">
        <v-btn>Answer Review</v-btn>
      </router-link>
    </v-layout>

    <!-- activities presentation -->
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-card>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md6>
                <div class="title font-weight-light indigo--text">Title</div>
                <div class="grey lighten-4">{{ Documents.title }}</div>
              </v-flex>
              <v-flex xs12 md6></v-flex>
              <v-flex xs12 md12>
                <div class="title font-weight-light indigo--text">Detail</div>
                <div class="grey lighten-4 pre-wrap">{{ Documents.question }}</div>
              </v-flex>
              <v-flex xs12 md4>
                <div class="title font-weight-light indigo--text">Purpose</div>
                <div class="grey lighten-4">{{ Documents.purpose }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Respond Time</div>
                <div class="grey lighten-4">{{ Documents.respondTime }}</div>
              </v-flex>
              <v-flex xs12 md5></v-flex>
              <v-flex xs12 md12>
                <h4>--- Drug Information ---</h4>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Drug Name</div>
                <div class="grey lighten-4">{{ Documents.drugName }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Drug Group</div>
                <div class="grey lighten-4">{{ Documents.drugGroup }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Trade Name</div>
                <div class="grey lighten-4">{{ Documents.tradeName }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Type of Question</div>
                <div class="grey lighten-4">{{ Documents.questionType }}</div>
              </v-flex>
              <v-flex xs12 md12>
                <h4>--- Client's Information ---</h4>
              </v-flex>
              <v-flex xs12 md1>
                <div class="title font-weight-light indigo--text">Age</div>
                <div class="grey lighten-4">{{ Documents.age }}</div>
              </v-flex>
              <v-flex xs12 md2>
                <div class="title font-weight-light indigo--text">Weight</div>
                <div class="grey lighten-4">{{ Documents.weight }}</div>
              </v-flex>
              <v-flex xs12 md2>
                <div class="title font-weight-light indigo--text">Height</div>
                <div class="grey lighten-4">{{ Documents.height }}</div>
              </v-flex>
              <v-flex xs12 md1>
                <div class="title font-weight-light indigo--text">LBW</div>
                <div class="grey lighten-4">{{ Documents.LBW }}</div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="title font-weight-light indigo--text">Other Information</div>
                <div class="grey lighten-4">{{ Documents.clientInfoETC }}</div>
              </v-flex>
              <v-btn flat fab color="warning" label="Continue" router to="/validate"></v-btn>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "DocumentDetail",
  data() {
    return {
      Documents: []
    };
  },
  mounted() {
    console.log(this.$route.params.docId);
    axios
      .get("https://logical-river-244214.appspot.com/documents/" + this.$route.params.docId)
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