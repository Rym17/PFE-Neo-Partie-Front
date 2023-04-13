<template>
  <v-app>
    <div
      id="LoaderApp "
      v-show="showLoaderApp"
      style=" margin-top: 25% !important"
    >
      <v-row>
        <v-col align="center">
          <span class="labelstyle">جاري إرسال الوثائق...</span></v-col
        >
      </v-row>
      <v-row>
        <div class="linear-activity">
          <div class="indeterminate"></div></div
      ></v-row>
    </div>
    <div id="ContentApp">
      <div id="div-container">
        <v-row>
          <v-col cols="12" md="12" sm="12">
            <span style="color:red !important; margin-left: 28% !important;">
              {{ ErrorText }}</span
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </v-app>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { bus } from "../../main";
import lang from "../../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";
import moment from "moment";
import config from "../../../public/config.json";
export default {
  name: "F01038",
  data: () => {
    return {
      showLoaderApp: false,
      ErrorText: "",
      snackbar: false,
      // Config - Data
      Lang: true,
      instance: "GED",
      locale: "fr-fr",
      // Stepper - Data
      step: 1,
      laststep: 1,
      steps: [{ name: "INFORMATIONS" }],
      icon: "navigate_next",
      tab: null,
      // Form - Data
      panel: [0, 1, 2, 3, 4, 5],
      FormDisabled: false,
      save: false,
      FormInfo: [],
      MailID: "",
      FormEID: "",
      ValidationResult: [],
      // NOTICE - Data
      noticeInfo: [],
      noticeCreated: false,
      notice: {
        courriers_id: "",
        chrono: "",
        reference: "",
        Lang: "",
        mapping: {
          SP_REDACTOR: "",
          SP_SIGNATORY: "",
          SP_REFERENCE: "",
          SP_SUBJECT: "",
          SP_COMMENTARY: "",
          SP_DESCRIPTION: "",
        },
        data: {
          CF_JS_CHRONO_AFFAIRE: "",
          CF_JS_CHRONO_AVOCAT: "",
          CF_JS_LEXICON_AVOCAT: "",
          CF_JS_DATE_DEPOT_REQUETE: "",
          CF_JS_HEURE_AUDIENCE: [],
          CF_JS_CONTEXTE: "",
          CF_JS_JUGEMENT: "",
          CF_JS_DATE_JUGEMENT: "",
          CF_JS_NATURE_JUGEMENT: "",
          CF_JS_CHARGE_RESUME: "",
          CF_JS_DATE_ENVOI_RESUME: "",
          CF_JS_DATE_RETOUR_RESUME: "",
          CF_JS_RESUME_ET_SAISI: "",
          CF_JS_DATE_ENVOI_SAISI: "",
          CF_JS_DATE_RETOUR_SAISI: "",
          CF_JS_POST_AUDIENCE: "val0",
          CF_JS_DATE_PV_AUDIENCE: "",
          CF_JS_DATE_AUDIENCE: "",
          CF_JS_TRIBUNAL: [],
          CF_JS_NUM_AFFAIRE: "9999",
          CF_JS_JUGE_PRESIDENT: [],
          CF_JS_MEMBRE_JUGE: [],
          CF_JS_GREFFIER: "",
          CF_JS_PHASE: "",
          CF_JS_CAUSE_REPORT: "",
          CF_JS_PV_AUDIENCE: "",
          CF_JS_CHAMBRE: [],
          CF_JS_FORMULE_BUREAU_AVOCAT: "",
          CF_JS_FORMULE_AVOCAT: "",
          CF_JS_NOM_PRENOM_AVOCAT: "",
          CP_JS_TRIBUNAL: [],
          CF_JS_CONSTITUTION_AVOCAT: "",
          CF_JS_JUGE_RAPPORTEUR: "",
          CF_JS_ETAT_PRINCIPAL_DOSSIER: [],
          CP_JS_ETAT_DOSSIER: [],
          CF_JS_DATE_DERNIER_PV_PLAIDOIRIE: "",
          CF_JS_TOTAL_AUDIENCES: "",
          CF_JS_AUDIENCE_PREMIERE_AVACAT: "",
          CF_JS_AUDIENCE_PREMIERE: "",
          CF_JS_CONTEXTE_EXPERTISE: "",
          CF_JS_ETAT_DOSSIER: "",
          CF_JS_ETAT_DOSSIER_INITIAL: "",
          CF_JS_AUDIENCE_PREMIERE_SAISIR: "",
        },
        TD_JS_CONVOCATIONS: { row: [] },
        TD_JS_JUSTIFICATIF: { row: [] },
        TD_JS_CLIENTS: { row: [] },
        TD_JS_PARTIE_ADVERSE: { row: [] },
        TD_JS_DEMANDE: { row: [] },
        TD_JS_DEMANDEURS: { row: [] },
        TD_JS_DEFENDEURS: { row: [] },
        TD_JS_SUIVI_JUGEMENTS: {},
        TD_JS_AUDIENCES: { row: [] },
        TD_JS_RAPPORTS: { row: [] },
        TD_JS_DEMANDE_REQUETE: { row: [] },
        TD_JS_ARGUMENTS: { row: [] },
        TD_JS_DEMANDE_RAPPORT: { row: [] },
        TD_JS_JUSTIFICATIF_RAPPORT: { row: [] },
        TD_JS_HISTORIQUE_ANDIENCE: { row: [] },
        TD_JS_TRACE: { row: [] },
        NOTICE_DOSSIER: {},
        LinkAttachements: false,
        Attachements: [],
        Creation: {
          uid: "",
          cn: "",
          datetime: null,
        },
        Modification: [],
        ModelExist: true,
        Modele: {
          file: "",
          pdf: false,
          Linked: false,
        },
      },
      html: {
        CF_JS_PV_AUDIENCE: "",
        CF_JS_JUGEMENT: "",
        CF_JS_CONTEXTE: "",
        CF_JS_CONSTITUTION_AVOCAT: "",
      },
      trace: {
        c01: "",
        c02: "",
        c03: "",
        c04: "",
        c05: "",
        c06: "",
        c07: "",
      },
      // NeoFileUploader - Data
      FileElise: [],
      empty: false,
      // Tables - Data
      // ITEMS - Data
      // FLOWCHARTS LABEL
      // Others - DATA
      AttachmenListFile: [],
      // Tables
    };
  },
  computed: {
    nameRules() {
      return (v) => v.length <= 568 || "568 caractères au maximum";
    },
    RequiredRule() {
      return (v) => !!v || this.$t("Messages.Message001");
    },

    MinValueRule() {
      return (value) => value >= 1 || this.$t("Messages.Message002");
    },
    nRules() {
      return (v) =>
        /^[0-9]*$/.test(v) ||
        "Le nombre de décimales doit être inférieur ou égal à 0";
    },
  },
  methods: {
    async form_Initialize() {
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = true;
      if (lang.locale == "fr") {
        this.$vuetify.rtl = false;
        document.getElementById("div-container").style.direction = "initial";
        // document.getElementById("footer-container").style.direction = "ltr";
      } else if (lang.locale == "ar") {
        this.$vuetify.rtl = true;
        document.getElementById("div-container").style.direction = "ltr";
        // document.getElementById("footer-container").style.direction = "ltr";
      }
      await this.GetUser();
      await this.GetUserLocal();
      await this.GetNoticeByMailID();
      await this.GeData();
      await this.sendNotice();
      $("#ContentApp").show(0);
      $("#LoaderApp").hide(0);
      this.showLoaderApp = false;
    },
    async GetUser() {
      this.user = await NeoApi.getUser();
      // this.user = await NeoApi.getUserLocal();
      bus.$emit("user", this.user);
    },
    async GetUserLocal() {
      this.userLocal = await NeoApi.getUserLocal();
      bus.$emit("user", this.userLocal);
    },
    async GeData() {
      this.AttachmenListFile = await NeoApi.getAttachmentsListWithStream(
        this.$route.query.EIDS,
        this.user.data.cn
      );
      // upload file list to Elise
      var j = 0;
      while (j < this.AttachmenListFile.length) {
        // upload file
        var extension = this.AttachmenListFile[j].Name.split(".");
        var t = {
          bs64: this.AttachmenListFile[j].PDF64Image,
          extension: extension[1],
        };
        console.log();
        var url = config.GLB_API_URL2 + "F0001/" + "UploadFile";
        var method = "post";
        var data = { formAttachment: t, UserInfo: this.userLocal };
        const response = await axios({
          url,
          method,
          data,
          maxContentLength: 1073741824,
          maxBodyLength: 1073741824,
        }).then((res) => (this.res = res.data));
        console.log(response);
        if (this.res.success == "true") {
          var attachement = {
            Fichier: this.AttachmenListFile[j].Name,
            categorie: "",
            datePro: "",
            dateEnregistement: "",
            ref: "",
            etat: "ACCEPTED",
            GUID: this.res.metadata[0].Value,
            WCDOCUMENT: this.res.metadata[1].Value,
            COURRIER_ID: this.res.metadata[2].Value,
            status: "ACTIF",
          };
          this.notice.Attachements.push(attachement);
        }
        j++;
      }
      console.log(
        "GeData | this.notice.Attachements ",
        this.notice.Attachements
      );
    },
    isEmpty(val) {
      return val === undefined || val == null || val.length <= 0 ? true : false;
    },
    async saveNotice(chrono, success, message) {
      console.log(" Begin savenotice | Avocat...");
      this.notice.data.CF_JS_CHRONO_AFFAIRE = chrono;
      this.trace.c01 = this.user.data.cn;
      this.trace.c02 = "نشر القضية";
      this.trace.c03 = moment(Date.now()).format("LLLL");
      this.trace.c04 = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      this.notice.data.this.trace.c05 = success;
      this.trace.c06 = chrono;
      this.trace.c07 = message;
      this.notice.TD_JS_TRACE.row.push(this.trace);
      console.log("savenotice | TRACE : ", this.notice.TD_JS_TRACE.row);
      console.log("date *****", moment(Date.now()).format("LLLL"));
      moment.locale("ar-tn");
      this.notice.data.CF_JS_DATE_ENVOI = moment(Date.now()).format("LLLL");
      await $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = true;
      this.notice.mapping = {
        SP_REDACTOR: "",
        SP_SIGNATORY: "",
        SP_REFERENCE: "",
        SP_SUBJECT: "",
        SP_COMMENTARY: "",
        SP_DESCRIPTION: "",
        MailID: "",
      };
      this.notice.Lang = lang.locale;
      this.notice.Attachements = this.FileElise;
      this.notice.courriers_id = this.$route.query.EIDS;
      this.notice.mapping.MailID = this.$route.query.EIDS;
      this.notice.mapping.SP_REDACTOR = this.user.data.cn;
      this.notice.mapping.SP_SIGNATORY = this.user.data.cn;
      this.notice.ModelExist = false;
      this.ValidationResult = await NeoApi.saveNotice(
        this.user,
        this.notice,
        "AP01",
        "F01030",
        this.html
      );
      if (this.ValidationResult.success == "true") {
        await NeoApi.LinkMails(this.user, this.ValidationResult.message, [
          this.$route.query.EIDS,
        ]);
        parent.location.href =
          Vue.prototype.$glbConfig.GLB_ELISE_URL +
          "GED/Elise/Home/document/overview?d=" +
          this.ValidationResult.message;
        console.log(this.ValidationResult.message);
      } else {
        $("#LoaderApp").hide(0);
        this.showLoaderApp = false;
      }
    },
    async saveNotice_RETURN_RECEIPT() {
      console.log(" Begin savenotice | Avocat...");
      console.log("date *****", moment(Date.now()).format("LLLL"));
      moment.locale("ar-tn");
      this.notice.data.CF_JS_DATE_ENVOI = moment(Date.now()).format("LLLL");
      await $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = true;

      this.notice.mapping = {
        SP_REDACTOR: "",
        SP_SIGNATORY: "",
        SP_REFERENCE: "",
        SP_SUBJECT: "",
        SP_COMMENTARY: "",
        SP_DESCRIPTION: "",
      };
      this.notice.Lang = lang.locale;
      this.notice.Attachements = this.FileElise;
      this.notice.mapping.SP_REDACTOR = this.user.data.cn;
      this.notice.mapping.SP_SIGNATORY = this.user.data.cn;
      this.notice.mapping.SP_SUBJECT = "إشعار بالإستلام";
      this.notice.ModelExist = true;
      this.ValidationResult = await NeoApi.saveNotice(
        this.user,
        this.notice,
        "AP01",
        "F01038",
        this.html
      );
      if (this.ValidationResult.success == "true") {
        await NeoApi.LinkMails(this.user, this.ValidationResult.message, [
          this.$route.query.EIDS,
        ]);
        parent.location.href =
          Vue.prototype.$glbConfig.GLB_ELISE_URL +
          "GED/Elise/Home/document/overview?d=" +
          this.ValidationResult.message;
        console.log(this.ValidationResult.message);
      } else {
        $(".loader").hide(0);
        $("#LoaderApp").show(0);
        this.showLoaderApp = false;
      }
    },
    async saveAffaireNotice(courrierID) {
      console.log("Begin saveAffaireNotice | jShare...");
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = true;
      this.notice.Lang = lang.locale;
      this.notice.courriers_id = "";
      this.html = {};
      this.notice.mapping.SP_REDACTOR = this.notice.data.CF_JS_CHAMBRE.ID;
      this.notice.mapping.SP_SIGNATORY = this.notice.data.CF_JS_CHAMBRE.ID;
      this.notice.mapping.SP_SUBJECT =
        this.notice.TD_JS_DEMANDEURS.row[0].c02 +
        "/" +
        this.notice.data.CF_JS_AUDIENCE_PREMIERE_AVACAT +
        "/" +
        this.notice.data.TD_JS_DEFENDEURS.row[0].c02;
      this.notice.courriers_id = courrierID;
      this.notice.mapping.MailID = courrierID;
      this.notice.ModelExist = false;
      var ValidationResult1 = await NeoApi.sendNotice(
        this.userLocal,
        this.notice,
        "AP01",
        "F01038",
        this.html
      );
      if (ValidationResult1.success == "true") {
        this.showLoaderApp = false;
      } else {
        $("#ContentApp").show(0);
        $("#LoaderApp").hide(0);
        this.showLoaderApp = false;
      }
    },
    async sendNotice() {
      console.log("Begin SendNotice | jShare...");
      var CF_JS_NUM_AFFAIRE_EXIST = false;
      var i = 0;
      console.log(
        "sendNotice | this.notice.TD_JS_TRACE.row",
        this.notice.TD_JS_TRACE.row
      );
      while (i < this.notice.TD_JS_TRACE.row.length) {
        console.log(
          "sendNotice | this.notice.TD_JS_TRACE.row[",
          i,
          "]",
          this.notice.TD_JS_TRACE.row[i]
        );
        if (
          this.isEmpty(this.notice.TD_JS_TRACE.row[i].c07) == false &&
          this.notice.TD_JS_TRACE.row[i].c02 == "نشر القضية"
        ) {
          console.log("sendNotice | this.notice.TD_JS_TRACE.row[", i, "] true");
          CF_JS_NUM_AFFAIRE_EXIST = true;
        }
        i++;
      }
      if (CF_JS_NUM_AFFAIRE_EXIST) {
        console.log("تم نشر القضية مسبقاً، لا يمكن نشرها مرةً أخرى");
        this.ErrorText = "تم نشر القضية مسبقاً، لا يمكن نشرها مرةً أخرى";
        $("#LoaderApp").hide(0);
        this.showLoaderApp = false;

        $("#ContentApp").show(0);
      } else {
        console.log("date *****", moment(Date.now()).format("LLLL"));
        moment.locale("ar-tn");
        this.notice.data.CF_JS_DATE_ENVOI = moment(Date.now()).format("LLLL");
        $("#ContentApp").hide(0);
        $("#LoaderApp").show(0);
        this.showLoaderApp = true;
        this.notice.Lang = lang.locale;
        this.notice.courriers_id = "";
        this.notice.mapping = {
          SP_REDACTOR: "",
          SP_SIGNATORY: "",
          SP_REFERENCE: "",
          SP_SUBJECT: "",
          SP_COMMENTARY: "",
          SP_DESCRIPTION: "",
        };
        this.html = {};
        this.notice.mapping.SP_REDACTOR = this.notice.data.CF_JS_CHAMBRE.ID;
        this.notice.mapping.SP_SIGNATORY = this.notice.data.CF_JS_CHAMBRE.ID;
        console.log(
          "sendNotice | checking if TD_JS_DEMANDEURS and  TD_JS_DEFENDEURS length > 0"
        );
        if (
          this.notice.TD_JS_DEMANDEURS.row.length > 0 &&
          this.notice.TD_JS_DEFENDEURS.row.length > 0
        ) {
          console.log(
            "sendNotice | TD_JS_DEMANDEURS and  TD_JS_DEFENDEURS length > 0"
          );

          this.notice.mapping.SP_SUBJECT =
            this.notice.TD_JS_DEMANDEURS.row[0].c02 +
            "/" +
            this.notice.data.CF_JS_AUDIENCE_PREMIERE_AVACAT +
            "/" +
            this.notice.data.TD_JS_DEFENDEURS.row[0].c02;
        } else {
          console.log(
            "sendNotice | TD_JS_DEMANDEURS and  TD_JS_DEFENDEURS length < 0"
          );
        }
        this.notice.ModelExist = true;
        var ValidationResult1 = await NeoApi.sendNotice(
          this.userLocal,
          this.notice,
          "AP01",
          "F01038",
          this.html
        );
        if (ValidationResult1.success == "true") {
          (this.notice.data.CF_JS_CHRONO_AFFAIRE = ValidationResult1.chrono),
            await this.saveNotice_RETURN_RECEIPT();
          var chrono = ValidationResult1.metadata[0].Value;
          var success = "نعم";
          var message = "-";
          await this.saveNotice(chrono, success, message);
          await this.saveAffaireNotice(message);
        } else {
          this.ErrorText =
            ValidationResult1.message + " : لم يتم نشر القضية اثر حدوث خطأ";
          var chrono1 = "-";
          var success1 = "لا";
          var message1 = ValidationResult1.message;
          await this.saveNotice(chrono1, success1, message1);
          $("#ContentApp").show(0);
          $("#LoaderApp").hide(0);
          this.showLoaderApp = false;
        }
      }
    },
    async updatenotice() {
      console.log("Begin updatenotice");
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = false;

      console.log("updatenotice | notice : ", this.notice);
      console.log("updatenotice | user : ", this.user);
      console.log("updatenotice | FileElise : ", this.FileElise);
      this.notice.Lang = lang.locale;
      this.notice.mapping.SP_SUBJECT = "عريضة";
      this.html.CF_JS_PV_AUDIENCE =
        "<HTML dir='rtl'>" + this.notice.data.CF_JS_PV_AUDIENCE + "</HTML>";
      this.html.CF_JS_JUGEMENT =
        "<HTML dir='rtl'>" + this.notice.data.CF_JS_JUGEMENT + "</HTML>";
      this.html.CF_JS_CONTEXTE =
        "<HTML dir='rtl'>" + this.notice.data.CF_JS_CONTEXTE + "</HTML>";
      console.log("updatenotice | Attachements : ", this.notice.Attachements);
      // this.notice.Table_Data = this.Table_Data;
      this.ValidationResult = await NeoApi.modifieNotice(
        this.user,
        this.notice,
        "AP01",
        "F01032",
        this.html
      );
      if (this.ValidationResult.success == "true") {
        parent.location.href =
          Vue.prototype.$glbConfig.GLB_ELISE_URL +
          "GED/Elise/Home/document/overview?d=" +
          this.ValidationResult.message;
      } else {
        $(".loader").hide(0);
        $("#LoaderApp").show(0);
        this.showLoaderApp = false;
      }
    },
    async GetNoticeByMailID() {
      console.log("Begin GetNoticeByMailID");
      let GetNoticeByMailIDResponse = [];
      var EIDS = this.$route.query.EIDS;
      GetNoticeByMailIDResponse = await NeoApi.GetNoticeByMailID(EIDS);
      console.log("GetNoticeByMailID | Response : ", GetNoticeByMailIDResponse);
      var notice_json = JSON.parse(GetNoticeByMailIDResponse.notice_json);
      console.log("GetNoticeByMailID | notice_json : ", notice_json);
      if (notice_json != null) {
        console.log("GetNoticeByMailID | notice_json != null ");

        this.noticeCreated = false;
        this.notice = notice_json;
        console.log("GetNoticeByMailID | notice : ", this.notice);

        bus.$emit("SetFileList", this.FileElise);

        let getJsonFromSPResponse = [];
        getJsonFromSPResponse = await NeoApi.getJsonFromSP(
          "sp_AP01_GetAUDIENCE",
          [
            {
              ParameterName: "Affaire",
              SqlDbType: "22",
              Value: this.notice.data.CF_JS_NUM_AFFAIRE,
            },
            { ParameterName: "Type", SqlDbType: "22", Value: "001" },
          ]
        );

        if (getJsonFromSPResponse.Success == "true") {
          GetNoticeByMailIDResponse = await NeoApi.GetNoticeByMailID(
            getJsonFromSPResponse.Result[0].courriers_id
          );

          this.notice.AUDIENCE_PREMIERE = JSON.parse(
            GetNoticeByMailIDResponse.notice_json
          );
        }

        getJsonFromSPResponse = [];
        getJsonFromSPResponse = await NeoApi.getJsonFromSP(
          "sp_AP01_GetAUDIENCE",
          [
            {
              ParameterName: "Affaire",
              SqlDbType: "22",
              Value: this.notice.data.CF_JS_NUM_AFFAIRE,
            },
            { ParameterName: "Type", SqlDbType: "22", Value: "003" },
          ]
        );

        if (getJsonFromSPResponse.Success == "true") {
          GetNoticeByMailIDResponse = await NeoApi.GetNoticeByMailID(
            getJsonFromSPResponse.Result[0].courriers_id
          );

          this.notice.AUDIENCE_PLAIDOIRIE = JSON.parse(
            GetNoticeByMailIDResponse.notice_json
          );
        }

        getJsonFromSPResponse = [];
        getJsonFromSPResponse = await NeoApi.getJsonFromSP(
          "sp_AP01_GetAUDIENCE",
          [
            {
              ParameterName: "Affaire",
              SqlDbType: "22",
              Value: this.notice.data.CF_JS_NUM_AFFAIRE,
            },
            { ParameterName: "Type", SqlDbType: "22", Value: "006" },
          ]
        );

        if (getJsonFromSPResponse.Success == "true") {
          GetNoticeByMailIDResponse = await NeoApi.GetNoticeByMailID(
            getJsonFromSPResponse.Result[0].courriers_id
          );

          this.notice.AUDIENCE_JUGEMENT = JSON.parse(
            GetNoticeByMailIDResponse.notice_json
          );
          this.notice.data.CF_JS_JUGEMENT = this.notice.AUDIENCE_JUGEMENT.data.CF_JS_PV_AUDIENCE;
        }
      } else {
        console.log("GetNoticeByMailID | notice_json == null ");
        this.noticeCreated = false;
      }
    },
    SaveformatDate(date) {
      if (!date) return null;
      return moment(date).format("DD/MM/YYYY");
    },
    closeWindow() {
      console.log("close window ...");
      parent.location.reload();
    },
  },
  async mounted() {
    if (lang.locale == "fr") {
      this.$vuetify.rtl = false;
      document.getElementById("div-container").style.direction = "initial";

      // document.getElementById("footer-container").style.direction = "ltr";
    } else if (lang.locale == "ar") {
      this.$vuetify.rtl = true;
      document.getElementById("div-container").style.direction = "ltr";

      // document.getElementById("footer-container").style.direction = "ltr";
    }
    await this.form_Initialize();

    //Called after the instance has been mounted, where element, passed to app.mount is replaced by the newly created vm.$el
    bus.$on("SetFileList", (data) => {
      this.FileElise = data;
      console.log("mounted : ", this.FileElise);
    });
  },
};
</script>
<style lang="scss">
@import "../../styles/variables.scss";
.loader-flex {
  margin-top: 25% !important;
}
.labelstyle {
  color: $color-blue-blumine;
  font-family: $elise-font-style;
  font-size: 20px;
}

.linear-activity {
  overflow: hidden;
  width: 50%;
  height: 7px;
  background-color: #b3e5fc;
  margin: 20px auto;
}

.indeterminate {
  position: relative;
  width: 100%;
  height: 50%;
}

.indeterminate:before {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #0a6e89;
  animation: indeterminate_first 1.5s infinite ease-out;
}

.indeterminate:after {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #0a6e89;
  animation: indeterminate_second 1.5s infinite ease-in;
}

@keyframes indeterminate_first {
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}

@keyframes indeterminate_second {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}
.tab {
  height: 87vh;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
.loader {
  width: 10px;
  height: 10px;
  border-width: 2px;
  margin: 4px;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #0a6e89;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  animation: spin 2s linear infinite;
  margin-left: 35%;
  margin-top: 15%;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.global-container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.AppBarButtonStyle {
  margin-left: 30%;
  margin-top: 2%;
}
.AppBarButton {
  margin-left: 60% !important;
  margin-top: 2%;
}
#elscrollbar {
  display: inline-block;
  width: 50%;
  overflow-x: hidden !important;
}
</style>
