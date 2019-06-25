<template>
    <v-container>
        <v-container v-if="IsAns()">
        <v-layout text-xs-center wrap>
            <v-container v-if=success>
            <v-flex class="title indigo--text text-xs-left">Answer:</v-flex>
            <v-flex>
            <v-card fluid>
              <v-card-text>
                {{Documents.answerDetail}}
              </v-card-text>
            </v-card>
            </v-flex>
            <v-flex v-if="IsImg()">
            <v-flex class="title indigo--text text-xs-left pt-3">Attached file(s):</v-flex>
            <!-- <v-flex v-for="n in Documents.fileURL.length" :key="n">
                <v-img :src="Documents.fileURL[n-1]" aspect-ratio="4" class="ma-1"></v-img>
            </v-flex> -->
            <v-flex v-for="n in Documents.fileURL.length" v-bind:key="n" class="mt-2 ml-2">
        <img :src="Documents.fileURL[n-1]" style="max-height: 100px ;">
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
            Documents:[],
            success: false
        }
    },
    methods:{
    IsImg(){
      if (this.Documents.fileURL != null){
        return true
      }
      else{
        return false
      }
    },
    IsAns(){
      if (this.Documents.answerDetail != null){
        return true
      }
      else{
        return false
      }
    }
    },
    mounted(){
        axios
      .get("https://logical-river-244214.appspot.com/documents/" + this.$route.params.docId)
      .then(response => {
        console.log(response.data)
        this.Documents = response.data
        this.success = true
      })
      .catch(error => {
        console.log(error)
      });
    }   
}
</script>