<template>
    <v-container>
        <v-layout>
            <router-link :to="{ path: '/documentDetail/' + this.$route.params.docId}">
        <v-btn>Document Detail</v-btn>
      </router-link>
      <router-link :to="{ path: '/suggestedDocuments/' + this.$route.params.docId}">
        <v-btn>Suggested Documents</v-btn>
      </router-link>
      <router-link :to="{ path: '/answer/' + this.$route.params.docId}">
        <v-btn>Write Answer</v-btn>
      </router-link>
      <v-btn class="blue">Answer Review</v-btn>
        </v-layout>


        <v-layout text-xs-center wrap>
            <h2 class="grey--text">Review Answer</h2>
            <div v-if=success>
            <p>{{Documents.answerDetail}}</p>
            
            <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
            <v-img src="https://firebasestorage.googleapis.com/v0/b/drug-suggestion-service.appspot.com/o/DSS%2F5d0b047ce8c326001252910e%2Fmedical-images-free-159878-6952218.jpg?alt=media&token=c76dd139-f7d8-4d53-93cd-2ec39689d98a" aspect-ratio="1.7"></v-img>
            <v-img :src="Documents.fileURL[0]" aspect-ratio="1.7"></v-img>
            
            <p>{{Documents.fileURL[0]}}</p>
            <p>{{Documents.fileURL[1]}}</p>
            </div>
        </v-layout>
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
