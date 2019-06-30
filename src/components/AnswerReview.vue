<template>
  <v-container>
    <v-container v-if="IsAns()">
      <v-layout text-xs-center wrap>
        <v-container v-if="success">

          <v-flex v-if="IsRevised()">
            <v-flex class="title indigo--text text-xs-left mb-2">Revised Question:</v-flex>
            <v-flex class="my-2">
              <v-card fluid>
                <v-card-text class="subheading">{{Documents.revisedQuestion}}</v-card-text>
              </v-card>
          </v-flex>
          </v-flex>

          <v-flex class="title indigo--text text-xs-left mt-5">Answer:</v-flex>
          <v-flex class="my-2">
            <v-card fluid>
              <v-card-text class="subheading">{{Documents.answerDetail}}</v-card-text>
            </v-card>
          </v-flex>
          
          <v-flex v-if="IsImg()">
            <v-flex class="title indigo--text text-xs-left pt-5">Attached file(s):</v-flex>
            <!-- <v-flex v-for="n in Documents.fileURL.length" :key="n">
              <v-img :src="Documents.fileURL[n-1]" aspect-ratio="4" class="ma-1"></v-img>
            </v-flex>-->
            <!-- <v-flex v-for="n in Documents.fileURL.length" v-bind:key="n" class="mt-2 ml-2">
              <img :src="Documents.fileURL[n-1]" style="max-height: 100px ;">
            </v-flex> -->
            <v-flex v-for="n in Documents.fileURL.length" v-bind:key="n" class="mt-2 ml-2">
              <a :href="Documents.fileURL[n-1]" target="_blank">File{{n}}</a>
            </v-flex>
          </v-flex>

          <v-flex v-if="IsDoc()">
            <v-flex class="title indigo--text text-xs-left pt-5">Attached file(s):</v-flex>
            <v-flex class="mt-2 ml-2">
              <a :href="Documents.docURL" target="_blank">Document</a>
            </v-flex>
          </v-flex>
          
        </v-container>
      </v-layout>
    </v-container>

    <v-container v-else>
      <v-layout fluid>
        <v-flex class="text-xs-center">There is no available answer yet</v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "AnswerReview",
  data() {
    return {
      Documents: [],
      success: false
    };
  },
  methods: {
    IsImg() {
      if (this.Documents.fileURL != null) {
        return true;
      } else {
        return false;
      }
    },
    IsDoc() {
      if ( this.Documents.docURL != null) {
        return true;
      } else {
        return false;
      }
    },
    IsAns() {
      if (this.Documents.answerDetail != null) {
        return true;
      } else {
        return false;
      }
    },
    IsRevised() {
      if (this.Documents.revisedQuestion != null || this.Documents.revisedQuestion != "") {
        console.log("true")
        return true;
      } else {
        return false;
        console.log("false")
      }
    }
  },
  mounted() {
    axios
      .get(
        "/documents/" +
          this.$route.params.docId
      )
      .then(response => {
        this.Documents = response.data;
        this.success = true;
        // console.log(this.Documents)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>