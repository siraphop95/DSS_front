<template>
  <div class="Louise">
    <v-container>
      <h4 class="grey--text">Sign up</h4>
      <v-form ref="form">
        <v-layout row wrap px-5 py-2 my-3>
          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Username"
              v-model="User.username"
              :rules="inputRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Password"
              :type="'password'"
              v-model="User.password"
              :rules="passwordRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Confirm Password"
              :type="'password'"
              v-model="User.confirmPassword"
              :rules="confirmPasswordRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Firstname"
              v-model="User.firstName"
              :rules="requiredRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Lastname"
              v-model="User.lastName"
              :rules="requiredRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md5>
            <v-text-field
              prepend-icon="local_hospital"
              label="Email"
              v-model="User.email"
              :rules="emailRules"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm7>
            <v-select
              menu-props="offsetY"
              prepend-icon="local_hospital"
              :items="userTypeItems"
              label="Health Professional"
              pa-3
              required
              :rules="requiredRules"
              v-model="User.userType"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-form>

      <v-btn @click="addToAPI">Submit</v-btn>
    </v-container>
  </div>
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
        // v => v.match(/[A-Z]/g) !== null || "At least one uppercase character is required"
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
      userTypeItems: [
        "แพทย์ทั่วไป","แพทย์เฉพาะทาง","ทันตแพทย์","เภสัชกร","พยาบาล","นักวิทย์","นักสาธารณสุข","นักศึกษาวิทย์ฯ","ประชาชน","อื่น ๆ"
        ]
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
          userType: this.User.userType
        };
        console.log(newUser);
        axios
          .post("https://logical-river-244214.appspot.com/users", newUser)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
