<template>
  <v-container fluid fill-height class="back">
    <v-layout column align-center justify-center>
      <v-card width="410px" height="auto" class="elevation-8">
        
        <v-card-title>
          <v-layout column align-center pt-2>
            <p class="headline">Sign Up</p>
          </v-layout>
        </v-card-title>
        
        <v-card-text class="px-4 py-0">
          <v-form ref="form">
            <v-text-field label="Username" v-model="User.username" :rules="inputRules" autofocus></v-text-field>
            <v-text-field
              label="Password"
              :type="'password'"
              v-model="User.password"
              :rules="passwordRules"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              :type="'password'"
              v-model="User.confirmPassword"
              :rules="confirmPasswordRules"
            ></v-text-field>
            <v-text-field label="Firstname" v-model="User.firstName" :rules="requiredRules"></v-text-field>
            <v-text-field label="Lastname" v-model="User.lastName" :rules="requiredRules"></v-text-field>
            <v-text-field label="Email" v-model="User.email" :rules="emailRules"></v-text-field>
            <v-select
              menu-props="offsetY"
              :items="professionItems"
              label="Health Professional"
              required
              :rules="requiredRules"
              v-model="User.profession"
            ></v-select>
            <v-select
              menu-props="offsetY"
              :items="userTypeItems"
              label="User Type"
              required
              :rules="requiredRules"
              v-model="User.userType"
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-3">
          <v-layout wrap py-3 px-0 ma-0>
            <v-flex pt-3 xs12>
              <v-btn class="ma-0 info" block round @click="addToAPI">Get Started!</v-btn>
            </v-flex>
            <v-flex class="text-xs-center" pt-4>
              <p class="caption">
                <span>Already Registed?</span>
                <a href="/login">Sign In now</a>
              </p>
            </v-flex>
          </v-layout>
        </v-card-actions>

      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "AddUser",
  data() {
    return {
      User: {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        profession: "",
        userType: ""
      },
      show: false,
      inputRules: [
        v => !!v || "required to fill",
        v => v.length >= 8 || "must be more than 8 characters"
      ],
      requiredRules: [v => !!v || "required to fill"],
      passwordRules: [
        v => !!v || "Password confirmation is required",
        v => v.length >= 8 || "Password must be more than 8 characters",
        v =>
          v.match(/[0-9]/g) !== null ||
          "Password must contain at least one number"
      ],
      confirmPasswordRules: [
        v => !!v || "Password confirmation is required",
        v => v == this.User.password || "Password must match"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      professionItems: [
        "แพทย์ทั่วไป",
        "แพทย์เฉพาะทาง",
        "ทันตแพทย์",
        "เภสัชกร",
        "พยาบาล",
        "นักวิทย์",
        "นักสาธารณสุข",
        "นักศึกษาวิทย์ฯ",
        "ประชาชน",
        "อื่น ๆ"
      ],
      userTypeItems: ["ผู้ถาม", "ผู้ตอบ"]
    };
  },
  methods: {
    addToAPI() {
      if (this.$refs.form.validate()) {
        let newUser = {
          username: this.User.username,
          password: this.User.password,
          firstName: this.User.firstName,
          lastName: this.User.lastName,
          email: this.User.email,
          profession: this.User.profession,
          userType: this.User.userType
        };
        console.log(newUser);
        axios
          .post("https://logical-river-244214.appspot.com/users", newUser)
          .then(response => {
            console.log(response);
            this.$router.push(this.$route.query.redirect || '/')
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
.back {
  background-image: url("https://images.pond5.com/white-polygons-and-free-space-footage-075635924_prevstill.jpeg");
  background-size: cover;
}
</style>