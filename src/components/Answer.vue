<template>
  <v-container>
    <v-btn @click="claimQuestion">Start Writing Answer</v-btn>
    <v-form ref="form">
      <v-layout row wrap justify-center>
        <v-flex class="title my-2 indigo--text">Revised Questions (optional):</v-flex>

        <v-flex xs12 md12>
          <v-textarea
            label="Revise the Question (optional)"
            v-model="Doc.revisedQuestion"
            auto-grow
            solo
            :disabled="!isClaim"
            full-width
          ></v-textarea>
        </v-flex>

        <v-flex class="title my-2 indigo--text">Answer:</v-flex>

        <v-flex xs12 md12>
          <v-textarea
            label="Write your Answer"
            v-model="Doc.answerDetail"
            :rules="inputRules"
            solo
            :disabled="!isClaim"
            required
            auto-grow
            full-width
          ></v-textarea>
        </v-flex>

        <v-flex xs12 md12>
          <v-combobox
            v-model="hashtag"
            :items="items"
            label="Keywords"
            chips
            :disabled="!isClaim"
            clearable
            prepend-icon="local_offer"
            multiple
            deletable-chips
          ></v-combobox>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <!-- attach image button start-->
        <v-flex>
          <v-btn large @click.native="selectFile" v-if="!lock">
            <v-icon left aria-hidden="true">add_a_photo</v-icon>Attach File
          </v-btn>
          <input
            id="files"
            type="file"
            name="file"
            ref="uploadInput"
            accept="image/*"
            :multiple="true"
            :disabled="!isClaim"
            @change="onFileChange($event)"
          />
        </v-flex>
        <!-- attach image button end -->

        <!-- preview attach image -->
        <v-flex v-for="(file, key) in files" v-bind:key="key" class="mt-2 ml-2">
          <img class="preview" v-bind:ref="'image' +parseInt( key )" style="max-height: 100px ;" />
        </v-flex>

        <v-flex xs12 md12 class="mt-3">
          <v-btn block color="primary" @click="upload(files)">Submit Answer</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "Answer",
  data() {
    return {
      documentFlag: undefined,
      files: [],
      lock: false,
      fileCount: 0,
      downloadURL: [],
      active: null,
      hashtag: [],
      items: [],
      user: [],
      isClaim: false,
      Doc: {
        answerDetail: "",
        revisedQuestion: ""
      },
      inputRules: [
        v => !!v || "required to fill",
        v => v.length >= 8 || "must be more than 8 characters"
      ],
      tabs: [
        { name: "Document Detail" },
        { name: "Suggested Documents" },
        { name: "Write Answer" },
        { name: "Answer Review" }
      ],
      currentUserID: undefined,
      unavaliable: false
    };
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click();
    },
    //to select multiple file
    onFileChange(e) {
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
      for (let i = 0; i < this.files.length; i++) {
        let reader = new FileReader(); //instantiate a new file reader
        reader.addEventListener(
          "load",
          function() {
            this.$refs["image" + parseInt(i)][0].src = reader.result;
          }.bind(this),
          false
        ); //add event listener

        reader.readAsDataURL(this.files[i]);
      }
    },
    upload(file) {
      // this.fileName = file.name;
      // this.uploading = true;

      if (file.length == 0) {
        this.updateToAPI();
      }
      for (var i = 0; i < file.length; i++) {
        var imageFile = file[i];
        console.log(imageFile.name);
        this.uploadEachImage(imageFile, this.$route.params.docId);
      }
    },
    uploadEachImage(imageFile, docId) {
      // return new Promise(function(resolve, reject) {
      var storageRef = firebase
        .storage()
        .ref("DSS/" + docId + "/newquestion" + imageFile.name);
      //Upload file task
      var task = storageRef.put(imageFile);

      task.on(
        "state_changed",
        //progress
        snapshot => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //uploader.value = percentage;
        },
        null,
        //on complete
        () => {
          task.snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log(downloadUrl);
            this.downloadURL.push(downloadUrl);
            this.fileCount++;
            //check if all file are uploaded
            if (this.fileCount == this.files.length) {
              console.log(this.downloadURL);
              this.fileCount = 0;
              this.updateToAPI();
            }
          });
        }
      );
      // });
    },
    updateToAPI() {
      if (this.$refs.form.validate()) {
        let newDoc = {
          answerDetail: this.Doc.answerDetail,
          revisedQuestion: this.Doc.revisedQuestion,
          fileURL: this.downloadURL,
          medicalPersonalUsername: this.user.username,
          keywords: this.hashtag
        };
        console.log(newDoc);
        axios
          .post("/documents/" + this.$route.params.docId, newDoc)
          .then(response => {
            console.log(response);
            this.$router.push("/myanswers");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    claimQuestion() {
      if (this.unavaliable == true) {
        alert("Unavaliable, someone else is answering");
      } else {
        this.isClaim = true;

        let newDoc = {
          flagID: this.user._id,
          flagTimer: new Date().getTime()
        };
        axios
          .post("/documents/" + this.$route.params.docId, newDoc)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/drugs")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.items.push(response.data[i].tradeName);
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/documents/" + this.$route.params.docId)
      .then(response => {
        this.documentFlag = response.data.flagID;
        console.log(this.documentFlag);
        console.log(this.user._id);
        console.log(new Date().getTime());
        console.log();
        if (typeof this.documentFlag === "undefined") {
          console.log("Unclaim");
          this.isClaim = false;
        } else if (this.user._id == this.documentFlag) {
          console.log("You claim");
          this.isClaim = true;
        } else {
          //86400000 is 1D
          var timeLimit = new Date().getTime() - response.data.flagTimer;
          if (timeLimit >= 86400000) {
            console.log("Time limit! you may answer");
            this.unavaliable = false;
          } else {
            console.log("someone else claim this");
            alert("someone else claim this question");
            this.unavaliable = true;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>