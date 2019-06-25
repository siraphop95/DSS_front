<template>
  <nav>
    <!-- toolbar -->
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Drug Suggestion Service</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- account -->
      <v-menu offset-y full-width:true min-width="200px">
        <v-btn flat fab slot="activator" color="grey">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-layout column align-center pt-3 class="white">
          <v-flex>
          <v-avatar size="70">
            <img src="@/assets/account_logo.png">
          </v-avatar>
          </v-flex>
          <v-flex>{{user.username}}</v-flex>
          <v-flex>{{user.email}}</v-flex>
        </v-layout>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" router :to="item.route">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- navigation-drawer -->
    <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
      app dark 
      floating
      persistent
      mobile-break-point="991"
      width="260"
      class="indigo"
    >
      <!-- <v-layout align-center justify-center>
        <v-btn class="mt-5 grey lighten-5" router to="/addDocument" v-if="user.userType=='questioner'">
          <v-icon left>add_circle</v-icon>
          <span>New Document</span>
        </v-btn>
      </v-layout> -->

      <v-list class="mt-5">
        <v-list-tile v-for="link in filteredByType" :key="link.text" router :to="link.route" class="ma-3" >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      drawer: true,
      links: [
        { icon: "add_circle", text: "Create New Question", route: "/addDocument" , type: "questioner"},
        { icon: "dashboard", text: "New Questions", route: "/newquestion" , type: "answerer"},
        { icon: "folder", text: "My Questions", route: "/myQuestions", type:"questioner"},
        { icon: "drafts", text: "My Answers", route: "/myAnswers", type: "answerer"},
        { icon: "drafts", text: "Reply Inbox", route: "/replyinbox", type: "questioner"},
        { icon: "account_balance", text: "Database", route: "/database", type: true }
      ],
      items: [
        { title: "Manage Profile", route: "/profile" },
        { title: "Log Out", route: "/logout" }
      ]
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  computed: {
     filteredByType: function() {
      var newUserType = this.user.userType
      return this.links.filter(function(link) {
        return newUserType == link.type || link.type == true
     })
   }
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }
}
a.primary--text {
  color: #e5e9ec !important;
  caret-color: #f4f4f4 !important;
}
</style>