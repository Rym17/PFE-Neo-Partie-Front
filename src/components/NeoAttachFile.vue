<template>
  <div class="neoattachfile">
    <label class="labelstyle">{{ label }} </label>
    <v-file-input
      v-model="files"
      show-size
      accept="*"
      slot="activator"
      class="inputStyle"
      placeholder=""
      v-bind="$attrs"
      v-on="$listeners"
      outlined
      dense
      :rules="rules"
      @change="AttachFile()"
    >
      <template v-slot:selection="{ text }">
        <v-chip small label color="primary">
          {{ text }}
        </v-chip>
      </template>
    </v-file-input>
  </div>
</template>
<script>
import axios from "axios";
// import { bus } from "../main";
import NeoApi from "@/plugins/neoapi.js";
import config from "../../public/config.json";
export default {
  props: {
    label: {
      type: String,
    },
    rules: {
      type: Array,
      required: false,
    },
  },
  data: () => {
    return {
      files: [],
      user: [],
    };
  },
  methods: {
    async GetUser() {
      this.user = await NeoApi.getUser();
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    async AttachFile() {
      console.log("neoattachfile | AttachFile : ", this.files);
      // this.files.GUID = "poiuytrtyuiopôiuytyui5555";
      // this.$emit("input", this.files);
      var bs64 = await this.getBase64(this.files);
      // this.files.bs64 = bs64;
      // this.$emit("input", this.files);

      var f = bs64.split(";");
      var d64 = f[1];
      var base64 = d64.split(",");
      var extension = this.files.name.split(".");
      console.log("neoattachfile | bs64 : ", bs64);
      console.log("neoattachfile | user : ", this.user);
      var t = {
        bs64: base64[1],
        extension: extension[1],
      };
      console.log("neoattachfile | 1 : ");

      var url = config.GLB_API_URL + "F0001/" + "UploadFile";
      var method = "post";
      console.log("neoattachfile | 1 : ");

      var data = { formAttachment: t, UserInfo: this.user };
      const response = await axios({
        url,
        method,
        data,
        maxContentLength: 1073741824,
        maxBodyLength: 1073741824,
      }).then((res) => (this.res = res.data));
      console.log(response);
      console.log("RES Upload", this.res);
      if (this.res.success == "true") {
        this.files.GUID = this.res.metadata[0].Value;
        console.log("GUID : ", this.files);
        this.$emit("input", this.files);
        console.log("files after emit **** : ", this.files);
      }
    },
  },
  async mounted() {
    await this.GetUser();
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
.v-application--is-ltr {
  .neoattachfile {
    .v-file-input .v-file-input__text .v-chip {
      margin: 0px !important ;
      background: $color-blue-dark !important;
    }
    .v-input__slot {
      font-size: $elise-font-size-4;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      background-color: $color-blue-catskill-white;
    }
    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .v-input__icon {
      align-items: center;
      display: inline-flex;
      height: 14px !important;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
      margin: -6 !important;
    }
    // v-input__icon--clear
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }
    .v-text-field__details {
      position: absolute;
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      top: -19px !important;
      left: 0;
      width: 100%;
    }
    .v-messages__message {
      position: absolute;
      right: 0;
    }
  }
}
.v-application--is-rtl {
  .neoattachfile {
    .v-file-input .v-file-input__text .v-chip {
      margin: 0px !important ;
      background: $color-blue-dark !important;
    }
    .v-input__slot {
      font-size: $elise-font-size-4;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      background-color: $color-blue-catskill-white;
    }
    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 2px !important;
      margin-left: -12px !important;
    }
    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .v-input__icon {
      align-items: center;
      display: inline-flex;
      height: 14px !important;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
      margin: -6 !important;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }
    .v-text-field__details {
      position: absolute;
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      position: absolute;
      top: -19px !important;
      left: -90%;
      width: 100%;
    }
    .v-messages__message {
      position: absolute;
      right: 0;
    }
  }
}
</style>
