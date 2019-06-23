<template>
  <div>
    <div v-for="(image, key) in images" v-bind:key="key">
      <div>
        <img class="preview" v-bind:ref="'image' +parseInt( key )" height="100px" width="150px">
        {{ image.name }}
      </div>
    </div>

    <!-- <img :src=this.imgURL> -->
    <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
      Upload a cover image
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
    <v-progress-circular
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary"
    >%</v-progress-circular>
    <!-- <img v-if="uploadEnd" :src="downloadURL" width="100%"> -->
    <v-btn color="green" @click="upload(images)">aUpload</v-btn>
    <div v-if="uploadEnd">
      <v-btn class="ma-0" dark small color="error" @click="deleteImage()">Delete</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  data() {
    return {
      firestorage: firebase.storage(),
      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: "",
      body: "",
      images: [],
      attach: false,
      selectedFile: ""
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
        this.images.push(selectedFiles[i]);
      }
      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader(); //instantiate a new file reader
        reader.addEventListener(
          "load",
          function() {
            this.$refs["image" + parseInt(i)][0].src = reader.result;
          }.bind(this),
          false
        ); //add event listener

        reader.readAsDataURL(this.images[i]);
      }
    },
    upload(file) {
      // this.fileName = file.name;
      // this.uploading = true;
      for (var i = 0; i < file.length; i++) {
        var imageFile = file[i];
        console.log(imageFile.name);
        this.uploadEachImage(imageFile);
      }

    },
    uploadEachImage(imageFile) {
      return new Promise(function(resolve, reject) {
        var storageRef = firebase.storage().ref("DSS/" + imageFile.name);
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
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
            });
          }
        );
      });
    },
    deleteImage() {
      this.firestorage
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
        })
        .catch(error => {
          console.error(`file delete error occured: ${error}`);
        });
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            console.log(downloadURL);
            this.$emit("downloadURL", downloadURL);
          });
        }
      );
    }
  },
  mounted() {}
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