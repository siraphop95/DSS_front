<template>
    <v-container>
        <v-container v-if="IsAns()">
        <v-layout text-xs-center wrap>
            <div v-if=success>
            <p>{{Documents.answerDetail}}</p>

            <div v-if="IsImg()">
            <v-flex v-for="img in Documents.fileURL" :key="img._id">
                <v-img :src="Documents.fileURL[0]" aspect-ratio="1.7"></v-img>
            </v-flex>
            </div>

            </div>
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
