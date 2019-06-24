<template>
  <v-container>

    <v-form ref="form">
      <v-layout justify-center>
        <v-flex xs12 md10>
          <v-textarea
              label="Write your Answer"
              v-model="Doc.answerDetail"
              :rules="inputRules" solo
              required auto-grow 
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>

<v-combobox
    v-model="chips"
    :items="items"
    label="Your favorite hobbies"
    chips
    clearable
    prepend-icon="filter_list"
    solo
    multiple
  >
    <template v-slot:selection="chips">
      <v-chip
        :selected="chips.selected"
        close
        @input="remove(chips.item)"
      >
        <strong>{{ chips.item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-combobox>

      <!-- <v-combobox
        v-model="chips"
        :items="items"
        label="Hashtag"
        chips
        prepend-icon="filter_list"
        multiple
      > -->
        <!-- <template >
          <v-chip close >
            <strong>{{ chips.item }}</strong>;
          </v-chip>
        </template> -->
      <!-- </v-combobox> -->


    <!-- attach image button start-->
    <v-btn @click.native="selectFile" v-if="!lock">
      attach file
      <v-icon right aria-hidden="true">add_a_photo</v-icon>
    </v-btn>
    <input
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="false"
      @change="onFileChange($event)"
    >
    <!-- attach image button end -->
    <v-btn color="primary" @click="upload(files)">Submit</v-btn>
    <v-btn flat>Cancel</v-btn>


    <!-- preview attach image -->
    <div v-for="(file, key) in files" v-bind:key="key">
      <div>
        <img class="preview" v-bind:ref="'image' +parseInt( key )" height="100px" width="150px">
        {{ file.name }}
      </div>
    </div>

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
      files: [],
      lock: false,
      fileCount: 0,
      html: '<h1>Hello</h1>',
      downloadURL: [],
      Doc: {
        answerDetail: ""
      },
      inputRules: [
        v => !!v || "required to fill",
        v => v.length >= 8 || "must be more than 8 characters"
      ],
      requiredRules: [v => !!v || "required to fill"],
      user: [],
      tabs: [
        { name: "Document Detail", component: `<DocumentDetail />`},
        { name: "Suggested Documents", component: `<DocumentDetail />` },
        { name: "Write Answer", component: `<DocumentDetail />` },
        { name: "Answer Review", component: `<DocumentDetail />` }
      ],
      active: null,
      chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        items: ['Streaming', 'Eating'],
      chip1: true
      // items: ["Watching movies", "Sleeping", "Streaming", "Eating"]
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
      for (var i = 0; i < file.length; i++) {
        var imageFile = file[i];
        console.log(imageFile.name);
        this.uploadEachImage(imageFile,this.$route.params.docId);
      }
    },
    uploadEachImage(imageFile,docId) {
      // return new Promise(function(resolve, reject) {
        var storageRef = firebase.storage().ref("DSS/"+docId+"/"+ imageFile.name);
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
              this.downloadURL.push(downloadUrl)
              this.fileCount++
              //check if all file are uploaded
              if(this.fileCount==this.files.length){
                console.log(this.downloadURL)
                this.fileCount=0
                this.updateToAPI()
              }
            });
          }
        );
      // });
    },
    updateToAPI() {
      let newDoc = {
        answerDetail: this.Doc.answerDetail,
        fileURL: this.downloadURL
      };
      console.log(newDoc);
      axios
        .post(
          "https://logical-river-244214.appspot.com/documents/" +
            this.$route.params.docId,
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
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
};
</script>
