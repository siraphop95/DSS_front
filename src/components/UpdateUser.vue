  <template>
  <div class="container">
    <form>
      <div class="well">
        <h4>Update User</h4>
        <div class="form-group" >
          <label class="pull-left">Username: </label>
          <input type="text" class="form-control" placeholder="Username" v-model="User.username">
        </div>
        <div class="form-group" >
          <label class="pull-left">Password: </label>
          <input type="text" class="form-control" placeholder="Password" v-model="User.password">
        </div>
        <div class="form-group" >
          <label class="pull-left">First Name: </label>
          <input type="text" class="form-control" placeholder="First Name" v-model="User.firstName">
        </div>
        <div class="form-group" >
          <label class="pull-left">Last Name: </label>
          <input type="text" class="form-control" placeholder="Last Name" v-model="User.lastName">
        </div>
        <div class="form-group" >
          <label class="pull-left">Email: </label>
          <input type="email" class="form-control" placeholder="Email" v-model="User.email">
        </div>
      </div>
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
      
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="updateToAPI">Submit</button>
      <router-link to="/users">
        <button class="btn btn-large btn-block btn-success full-width">Back to User Page</button>
      </router-link>
    </form>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'UpdateUser',
  data () {
    return {
      msg: 'Update User',
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
      requiredRules: [v => !!v || "required to fill"],
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
    }
  },
  methods: {
    updateToAPI () {
      console.log(this.$route.params.userId)
      var userTemp = this.changeValue()
      let newUser = {
        username: this.User.username,
          password: this.User.password,
          firstName: this.User.firstName,
          lastName: this.User.lastName,
          email: this.User.email,
          profession: this.User.profession,
          userType: userTemp
      }
      console.log(newUser)
      axios.post('/users/' + this.$route.params.userId, newUser)
        .then((response) => {
          console.log(response)
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeValue(value){
      var temp
      if(value == "ผู้ถาม"){
        return temp = "answerer"
      }
      else{
        return temp = "questioner"
      }
    },
    changeValueBack(value){
      var temp
      if(value == "answerer"){
        return temp = "ผู้ถาม"
      }
      else{
        return temp = "ผู้ตอบ"
      }
    }
  },
  mounted () {
    axios.get('/users/' + this.$route.params.userId)
      .then((response) => {
        console.log(response.data)
        this.User = response.data
        this.User.userType = this.changeValueBack()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>