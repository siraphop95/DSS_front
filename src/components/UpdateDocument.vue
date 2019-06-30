<template>
  <div class="UpdateDocument">
    <v-container>
      <h4 class="grey--text">Create a New Document</h4>

      <v-stepper v-model="stepper">
        <!-- stepper header -->
        <v-stepper-header>
          <div v-for="(link,index) in steps" :key="index">
            <v-stepper-step :complete="(index+1) <= stepper" :step="index+1">{{ link.text }}</v-stepper-step>
            <v-divider></v-divider>
          </div>
        </v-stepper-header>

        <v-stepper-items>
          <!-- stepper content 1 -->
          <v-stepper-content step="1">
            <v-form ref="form">
              <v-layout row wrap px-5 py-2 my-3>
                <v-flex xs12 md5>
                  <v-text-field
                    prepend-icon="local_hospital"
                    label="Title"
                    v-model="Doc.title"
                    :rules="inputRules"
                    required 
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md10>
                  <v-textarea
                    prepend-icon="local_hospital"
                    label="What is your Question?"
                    v-model="Doc.question"
                    :rules="inputRules"
                    required auto-grow
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    prepend-icon="local_hospital"
                    label="Drug Name"
                    v-model="Doc.drugName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 ml-2>
                  <v-text-field
                    prepend-icon="local_hospital"
                    label="Drug Group"
                    v-model="Doc.drugGroup"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3 ml-2>
                  <v-text-field
                    prepend-icon="local_hospital"
                    label="Trade Name "
                    v-model="Doc.tradeName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm7>
                  <v-select
                    menu-props="offsetY"
                    prepend-icon="local_hospital"
                    :items="questionTypeItems"
                    label="Type of Question"
                    pa-3
                    required :rules="requiredRules"
                    v-model="Doc.questionType"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-form>
            <v-btn color="primary" @click="stepperContinue">Continue</v-btn>
          </v-stepper-content>

          <!-- stepper content 2 -->
          <v-stepper-content step="2">
            <v-form>
              <h4 class="grey--text">
                Client's Information
                <span class="subheading">(Optional)</span>
              </h4>
              <v-layout row wrap px-5 py-2 my-3>
                <v-flex xs12 md3 ml-2>
                  <v-text-field prepend-icon="local_hospital" label="Age" v-model="Doc.age"></v-text-field>
                </v-flex>
                <v-flex xs12 md3 ml-2>
                  <v-text-field prepend-icon="local_hospital" label="Weight" v-model="Doc.weight"></v-text-field>
                </v-flex>
                <v-flex xs12 md3 ml-2>
                  <v-text-field prepend-icon="local_hospital" label="Height" v-model="Doc.height"></v-text-field>
                </v-flex>
                <v-flex xs12 md3 ml-2>
                  <v-text-field prepend-icon="local_hospital" label="LBW" v-model="Doc.LBW"></v-text-field>
                </v-flex>
                <v-flex xs12 md10>
                  <v-textarea
                    prepend-icon="local_hospital"
                    label="Other Information"
                    v-model="Doc.clientInfoETC"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
            <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
            <v-btn flat @click="stepper = 1">Go Back</v-btn>
          </v-stepper-content>

          <!-- stepper content 3 -->
          <v-stepper-content step="3">
            <v-form ref="step3">
              <v-layout row wrap px-5 py-2 my-3>
                <v-flex xs12 sm6>
                  <v-select
                    menu-props="offsetY"
                    prepend-icon="local_hospital"
                    :items="purposeItems"
                    label="Type of Question"
                    pa-3 :rules="requiredRules"
                    v-model="Doc.purpose"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <!-- <v-slider
                    v-model="Doc.respondTime"
                    :tick-labels="respondTimes"
                    :rules="requiredRules"
                    :max="3"
                    step="1"
                    tick-size="5"
                  ></v-slider> -->
                  <v-select
                    menu-props="offsetY"
                    prepend-icon="local_hospital"
                    :items="respondTimes"
                    label="Respond Time"
                    pa-3 :rules="requiredRules"
                    v-model="Doc.respondTime"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-form>
            <v-btn color="primary" @click="addToAPI">Continue</v-btn>
            <v-btn flat @click="stepper = 2">Go Back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateDocument",
  data() {
    return {
      Doc: {
        title: "",
        question: "",
        drugName: "",
        drugGroup: "",
        tradeName: "",
        questionType: "",

        age: "",
        weight: "",
        height: "",
        LBW: "",
        clientInfoETC: "",

        purpose: "",
        respondTime: ""
      },
      steps: [{ text: "Step 1" }, { text: "Step 2" }, { text: "Step 3" }],
      stepper: 0,
      inputRules: [
        v => !!v || "required to fill",
        v => v.length >= 8 || "must be more than 8 characters"
      ],
      requiredRules: [
        v => !!v || "required to fill"
      ],
      questionTypeItems: [
        "Identification",
        "Availability",
        "Pharmacokinetics",
        "Pregnancy/ Lactation",
        "Interactions",
        "Formulation",
        "ADR/Side effects",
        "Toxicity/ Poisoning",
        "Dosage/ Administration",
        "Therapeutic use/ Disease",
        "Compatibility/ Stability",
        "Herbal/ Conventional medicine",
        "อื่นๆ"
      ],
      purposeItems: [
        "เพื่อแก้ปัญหาผู้ป่วย",
        "เพื่อประโยชน์ในการปฏิบัติงาน",
        "เพื่อเพิ่มเติมความรู้",
        "เพื่อการศึกษา/วิจัย",
        "อื่นๆ"
      ],
      respondTimes: ["< 15 นาที", "15-60 นาที", "1 วัน", "7 วัน"],
      user: []
    };
  },
  methods: {
    stepperContinue(){
      if (this.$refs.form.validate()) {
        this.stepper = this.stepper+1;
      }
    },
    addToAPI() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.$refs.step3.validate()) {
      let newDoc = {
        title: this.Doc.title,
        question: this.Doc.question,
        drugName: this.Doc.drugName,
        drugGroup: this.Doc.drugGroup,
        tradeName: this.Doc.tradeName,
        questionType: this.Doc.questionType,

        age: this.Doc.age,
        weight: this.Doc.weight,
        height: this.Doc.height,
        LBW: this.Doc.LBW,
        clientInfoETC: this.Doc.clientInfoETC,

        purpose: this.Doc.purpose,
        respondTime: this.Doc.respondTime
      };
      console.log(newDoc);
      axios
        .post("/documents/"+ this.$route.params.docId, newDoc)
        .then(response => {
          console.log(response);
          this.$router.push("/database");
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  },
  mounted () {
    axios.get('/documents/' + this.$route.params.docId)
      .then((response) => {
        console.log(response.data)
        this.Doc = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
};
</script>
