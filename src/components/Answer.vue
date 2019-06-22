<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <h2 class="grey--text">Write Answer</h2>
      <v-spacer></v-spacer>
      <router-link :to="{ path: '/documentDetail/' + this.$route.params.docId}">
        <v-btn>Document Detail</v-btn>
      </router-link>
      <router-link :to="{ path: '/suggestedDocuments/' + this.$route.params.docId}">
        <v-btn>Suggested Documents</v-btn>
      </router-link>
      <v-btn dark class="blue">Write Answer</v-btn>
    </v-layout>

    <v-form ref="form">
      <v-layout row wrap px-5 py-2 my-3>
        <v-flex xs12 md5>
          <v-text-field
            prepend-icon="local_hospital"
            label="Answer"
            v-model="Doc.answerDetail"
            :rules="inputRules"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>


<template>
  <v-combobox
    v-model="chips"
    :items="items"
    label="Hashtag"
    chips
    clearable
    prepend-icon="filter_list"
    solo offset-y
    multiple
  >
    <template v-slot:selection="chips">
      <v-chip
        :selected="chips.selected"
        close
        @input="remove(chips.item)"
      >
        <strong>{{ chips.item }}</strong>;
      </v-chip>
    </template>
  </v-combobox>
</template>

    <v-btn color="primary" @click="updateToAPI">Submit</v-btn>
    <v-btn flat>Cancel</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Answer",
  data() {
    return {
      Doc: {
        answerDetail: ""
      },
      inputRules: [
        v => !!v || "required to fill",
        v => v.length >= 8 || "must be more than 8 characters"
      ],
      requiredRules: [v => !!v || "required to fill"],
      user: [],
      chips: ['Watching movies', 'Sleeping'],
      items: ['Watching movies', 'Sleeping','Streaming', 'Eating']
    };
  },
  methods: {
    updateToAPI() {
      console.log(this.$route.params.docId);
      let newDoc = {
        answerDetail: this.Doc.answerDetail
      };
      console.log(newDoc);
      axios
        .post(
          "https://logical-river-244214.appspot.com/documents/" + this.$route.params.docId,
          newDoc
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      //   window.location.reload()
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
};
</script>