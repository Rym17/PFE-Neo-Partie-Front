<template>
  <v-container class="py-0">
    <v-card flat>
      <v-form
        id="fileUpload"
        ref="fileUpload"
        lazy-validation
        :disabled="disable"
      >
        <div class="divStyle1">
          <v-row class="mt-2 mx-3">
            <v-col cols="12" md="3">
              <neo-select
                v-bind:label="$t('NeoFileUploader.Categories')"
                v-model="categorie"
                :items="FileItems"
                background-color="#f3f8f9"
                :disabled="disable"
                :rules="rules"
                :isRequired="isRequired"
              />
            </v-col>
            <v-col cols="12" md="3">
              <label class="labelstyle"
                >{{ $t("NeoFileUploader.File")
                }}<span
                  v-show="isRequired"
                  style="color: red; margin-left: 10px; font-size: 20px"
                >
                  *
                </span></label
              >
              <v-file-input
                v-model="files"
                placeholder=""
                outlined
                dense
                class="uploadFileStyle"
                background-color="#f3f8f9"
                show-size
                :disabled="disable || false"
                isRequired
                :rules="rules"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" md="2">
              <neo-date-picker
                locale="ar-TN"
                v-bind:label="$t('NeoFileUploader.DatePro')"
                v-model="datePro"
              ></neo-date-picker>
            </v-col>
            <v-col cols="12" md="2">
              <neo-date-picker
                locale="ar-TN"
                v-bind:label="$t('NeoFileUploader.DateEnregistrement')"
                v-model="dateEnregistement"
              ></neo-date-picker>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                dark
                color="#165c77"
                class="buttonStyle white--text"
                @click="uploadFile()"
                depressed
                :disabled="disable"
              >
                {{ $t("NeoFileUploader.UploadButton") }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
      <div class="divStyle2">
        <span
          v-show="empty || vide"
          v-if="FileElise.length == 0"
          style="color: red !important; margin-left: 29% !important"
          >{{ $t("NeoFileUploader.Required-msg") }}</span
        >
        <span
          v-if="MaximumLength"
          style="color: red !important; margin-left: 29% !important"
          >{{ $t("NeoFileUploader.MaximumLength") }}</span
        >
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.File") }}
                </th>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.Category") }}
                </th>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.DatePro") }}
                </th>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.DateEnregistrement") }}
                </th>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.Reference") }}
                </th>

                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.Status") }}
                </th>
                <th class="text-left">
                  {{ $t("NeoFileUploader.Table.Actions") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, n) in FileElise" :key="item.Fichier">
                <td v-if="item.status == 'ACTIF'">{{ item.Fichier }}</td>
                <td v-if="item.status == 'ACTIF'">{{ item.categorie }}</td>
                <td v-if="item.status == 'ACTIF'">{{ item.datePro }}</td>
                <td v-if="item.status == 'ACTIF'">
                  {{ item.dateEnregistement }}
                </td>
                <td v-if="item.status == 'ACTIF'">{{ item.ref }}</td>
                <td v-if="item.etat == 'PENDING' && item.status == 'ACTIF'">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </td>
                <td v-if="item.etat == 'ACCEPTED' && item.status == 'ACTIF'">
                  <v-icon color="green">done</v-icon>
                </td>
                <td v-if="item.etat == 'REJECTED' && item.status == 'ACTIF'">
                  <v-icon color="red">highlight_off</v-icon>
                </td>
                <td v-if="item.status == 'ACTIF'">
                  <v-btn :disabled="disable" icon @click="deleteFile(n)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </v-container>
</template>
<script>
// import Vue from "vue";
import axios from "axios";
import { bus } from "../main";
import config from "../../public/config.json";
import NeoApi from "@/plugins/neoapi.js";

export default {
  data: () => {
    return {
      dates: [],
      categorie: "",
      datePro: null,
      dateEnregistement: null,
      files: [],
      FileElise: [],
      FormInfo: [],
      notice: [],
      user: [],
      vide: false,
    };
  },
  props: {
    FileItems: Array,
    disable: Boolean,
    empty: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      required: false,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },
    MaximumLength: {
      type: Boolean,
      default: false,
    },
    // NoteCreated: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  methods: {
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
    async uploadFile() {
      if (typeof this.files.name !== "undefined" && this.categorie !== "") {
        console.log(this.files);
        var d = {
          Fichier: this.files.name,
          categorie: this.categorie,
          datePro: this.datePro,
          dateEnregistement: this.dateEnregistement,
          ref: "",
          etat: "PENDING",
          GUID: "",
          WCDOCUMENT: "",
          COURRIER_ID: "",
          status: "ACTIF",
        };

        this.FileElise.push(d);
        //this.props.empty = false;
        var bs64 = await this.getBase64(this.files);
        var extension = this.files.name.split(".");
        this.files = [];
        //this.categorie = "";

        //
        //console.log(bs64);
        var f = bs64.split(";");
        var d64 = f[1];
        var base64 = d64.split(",");

        this.b64File = base64[1];
        this.loading = true;
        this.$refs.fileUpload.reset();

        var t = {
          bs64: this.b64File,
          categorie: d.categorie,
          extension: extension[1],
        };
        //this.user.data.login
        // this.user.data.instanceName
        var url = config.GLB_API_URL + "F0001/" + "UploadFile";
        var method = "post";
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
          d.etat = "ACCEPTED";
          d.GUID = this.res.metadata[0].Value;
          d.WCDOCUMENT = this.res.metadata[1].Value;
          d.COURRIER_ID = this.res.metadata[2].Value;
          d.status = "ACTIF";
        } else {
          d.etat = "REJECTED";
        }

        console.log(d);
        setTimeout(() => {
          this.progress = 0;
          this.loading = false;
        }, 10000);
        console.log("file List : ", this.FileElise);
        bus.$emit("SetFileList", this.FileElise);
      } else {
        this.vide = true;
      }
    },
    async deleteFile(n) {
      console.log(this.FileElise[n]);
      console.log(this.FormInfo);
      console.log(this.notice);
      if (this.FileElise[n].COURRIER_ID !== "") {
        console.log("nnnnnnnnnnnn", n);
        if (this.FormInfo.form_separate_documents == 1) {
          var json = JSON.parse(this.notice.notice_json);
          var mailPrincipale = json.courriers_id;
          var mailSecondaire = this.FileElise[n].COURRIER_ID;
          console.log("notiiiice", this.notice);
          var metadata = [
            {
              Key: "MailPricipale",
              Value: mailPrincipale,
            },
            {
              Key: "mailSecondaire",
              Value: mailSecondaire,
            },
            {
              Key: "Instance",
              Value: this.user.data.instanceName, //"GED",
            },
            {
              Key: "UserLogin",
              Value: this.user.data.login, //"AdminGED",
            },
            {
              Key: "Notice_id",
              Value: this.notice.notice_id,
            },
          ];
          await axios
            .post(config.GLB_API_URL + "DeleteFile", metadata)
            .then((res) => console.log(res.data));
          this.FileElise[n].status = "DELETED";
        } else {
          var jsonnotice = JSON.parse(this.notice.notice_json);
          var response = await NeoApi.GetMailLastUpdateDate(
            this.user.data.instanceName,
            this.user.data.login,
            jsonnotice.courriers_id
          );
          if (response.success == "true") {
            await NeoApi.DeleteFileFromElise(
              jsonnotice.courriers_id,
              this.FileElise[n].WCDOCUMENT,
              false,
              false,
              response.message
            );
            var mailPrincipale1 = jsonnotice.courriers_id;
            var mailSecondaire1 = this.FileElise[n].COURRIER_ID;
            console.log("notiiiice", this.notice);
            var metadata1 = [
              {
                Key: "MailPricipale",
                Value: mailPrincipale1,
              },
              {
                Key: "mailSecondaire",
                Value: mailSecondaire1,
              },
              {
                Key: "Instance",
                Value: this.user.data.instanceName, //"GED",
              },
              {
                Key: "UserLogin",
                Value: this.user.data.login, //"AdminGED",
              },
              {
                Key: "Notice_id",
                Value: this.notice.notice_id,
              },
            ];
            await axios
              .post(config.GLB_API_URL + "DeleteFile", metadata1)
              .then((res) => console.log(res.data));
            this.FileElise[n].status = "DELETED";
          }
        }
        console.log(this.notice);
      } else {
        this.FileElise.splice(n, 1);
      }

      console.log(this.FileElise[n]);

      bus.$emit("SetFileList", this.FileElise);
    },
  },
  mounted() {
    bus.$on("FormInfo", (data) => {
      this.FormInfo = data;
    });
    bus.$on("user", (data) => {
      this.user = data;
      console.log("useer", data);
    });
    bus.$on("SetFileList", (data) => {
      this.FileElise = data;
      console.log("FileElise", this.FileElise);
    });
    bus.$on("Notice", (data) => {
      this.notice = data;
      console.log("FileElise", this.FileElise);
    });
  },
};
</script>
<style lang="scss">
#app {
  .neoFileUpload {
    .v-file-input .v-file-input__text .v-chip {
      margin: -1px !important ;
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
    .v-input__icon {
      align-items: center;
      display: inline-flex;
      height: 14px !important;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
    }
    .buttonStyle {
      height: 30px !important;
      width: 130px !important;

      margin-left: 3% !important;
      margin-top: 18% !important;
      /*font-family: "Trebuchet MS", sans-serif !important;
  font-size: 16px;
  font-weight: bold;*/
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 14px;
      margin-left: 10px;
    }
    .v-messages__message {
      position: absolute;
      right: 0;
    }
    .v-btn__content .v-icon--right {
      margin-right: 6px !important;
    }
    .divStyle2 {
      width: 100% !important;
      margin-left: 11% !important;
      margin-top: 5% !important;
      font-family: $elise-font-style;
      font-size: $elise-font-size-5;
      color: $color-blue-blumine;
    }
    .divStyle1 {
      width: 90% !important;
      margin-left: 11% !important;
      display: flex !important;
      justify-content: center !important;
    }
    .TableTitle {
      font-family: $elise-font-style;
      font-size: $elise-font-style;
      font-weight: bold;
      color: $elise-font-color-3;
    }
    .v-data-table {
      background-color: #f3f8f9 !important;
      line-height: 3 !important;
      max-width: 100%;
      color: #555554 !important;
      font-family: $elise-font-style;
      font-size: $elise-font-size-4 !important;
    }
    .v-data-table tbody tr td {
      background-color: #ffffff;

      font-family: $elise-font-style;

      font-size: $elise-font-size-4 !important;

      border-bottom: 1px solid $color-blue-dark !important;
    }
  }
}
</style>
