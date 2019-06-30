<template>
  <v-container>
    
    <!-- activities presentation -->
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-card>
          <v-container>
            <v-layout wrap>
              <v-flex xs12 md6>
                <div class="title font-weight-light indigo--text">Title</div>
                <div class="grey lighten-4">{{ Document.title }}</div>
              </v-flex>
              <v-flex xs12 md6></v-flex>
              <v-flex xs12 md12>
                <div class="title font-weight-light indigo--text">Detail</div>
                <div class="grey lighten-4 pre-wrap">{{ Document.question }}</div>
              </v-flex>
              <v-flex xs12 md4>
                <div class="title font-weight-light indigo--text">Purpose</div>
                <div class="grey lighten-4">{{ Document.purpose }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Respond Time</div>
                <div class="grey lighten-4">{{ Document.respondTime }}</div>
              </v-flex>
              <v-flex xs12 md5></v-flex>
              <v-flex xs12 md12>
                <h4>--- Drug Information ---</h4>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Drug Name</div>
                <div class="grey lighten-4">{{ Document.drugName }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Drug Group</div>
                <div class="grey lighten-4">{{ Document.drugGroup }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Trade Name</div>
                <div class="grey lighten-4">{{ Document.tradeName }}</div>
              </v-flex>
              <v-flex xs12 md3>
                <div class="title font-weight-light indigo--text">Type of Question</div>
                <div class="grey lighten-4">{{ Document.questionType }}</div>
              </v-flex>
              <v-flex xs12 md12>
                <h4>--- Client's Information ---</h4>
              </v-flex>
              <v-flex xs12 md1>
                <div class="title font-weight-light indigo--text">Age</div>
                <div class="grey lighten-4">{{ Document.age }}</div>
              </v-flex>
              <v-flex xs12 md2>
                <div class="title font-weight-light indigo--text">Weight</div>
                <div class="grey lighten-4">{{ Document.weight }}</div>
              </v-flex>
              <v-flex xs12 md2>
                <div class="title font-weight-light indigo--text">Height</div>
                <div class="grey lighten-4">{{ Document.height }}</div>
              </v-flex>
              <v-flex xs12 md1>
                <div class="title font-weight-light indigo--text">LBW</div>
                <div class="grey lighten-4">{{ Document.LBW }}</div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="title font-weight-light indigo--text">Other Information</div>
                <div class="grey lighten-4">{{ Document.clientInfoETC }}</div>
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
      Document: []
    };
  },
  mounted() {
    // console.log(this.$route.params.docId);
    axios
      .get("/documents/" + this.$route.params.docId)
      .then(response => {
        // console.log(response.data);
        this.Document = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>