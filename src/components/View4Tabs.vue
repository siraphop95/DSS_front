<template>
  <v-container>
    <v-tabs v-model="active" centered grow icons-and-text> 
      
      <v-tab v-for="tab in tabs" :key="tab.name">{{tab.name}} 
          <v-icon>{{tab.icon}}</v-icon>
      </v-tab>
      
      <v-tabs-slider color="indigo lighten-1"></v-tabs-slider>

      <v-tab-item>
        <DocumentDetail />
        <v-btn class="info" block round @click="next">Next Page</v-btn>
      </v-tab-item>
      <v-tab-item>
        <SuggestedDocuments />
        <v-btn class="info" block round @click="next">Next Page</v-btn>
      </v-tab-item>
      <v-tab-item>
        <Answer />
      </v-tab-item>
      <v-tab-item>
        <AnswerReview />
        <v-btn class="info" block round @click="next">Go to Document Detail Page</v-btn>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import DocumentDetail from '@/components/DocumentDetail'
import SuggestedDocuments from '@/components/SuggestedDocuments'
import Answer from '@/components/Answer'
import AnswerReview from '@/components/AnswerReview'

export default {
  name: "View4Tabs",
  components: { 
    DocumentDetail,
    SuggestedDocuments,
    Answer,
    AnswerReview 
  },
  data() {
    return {
      tabs: [
        { name: "Document Detail", icon: "assignment"},
        { name: "Suggested Documents", icon: "announcement" },
        { name: "Write Answer", icon: "create" },
        { name: "Answer Review", icon: "done_outline" }
      ],
      active: null
    };
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
};
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>