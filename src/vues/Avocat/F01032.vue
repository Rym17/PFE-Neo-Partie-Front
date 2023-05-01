<template>
  <v-app>
    <div
      id="LoaderApp "
      v-show="showLoaderApp"
      style=" margin-top: 25% !important"
    >
      <v-row>
        <div class="linear-activity">
          <div class="indeterminate"></div></div
      ></v-row>
    </div>
    <div id="ContentApp">
      <div id="div-container">
        <v-app-bar flat color="transparent">
          <!-- <v-container app class="py-0">
            <v-col cols="12" md="12">
              <v-btn
                outlined
                fab
                color="#0b7b99"
                class="ButtonNextStyle"
                @click="saveNotice()"
                v-show="!noticeCreated"
              >
                <v-icon>done</v-icon>
              </v-btn>
              <v-btn
                outlined
                fab
                color="#0b7b99"
                class="ButtonNextStyle"
                @click="updatenotice()"
                v-show="noticeCreated"
              >
                <v-icon>update</v-icon>
              </v-btn>
            </v-col>
          </v-container> -->
        </v-app-bar>
      </div>
      <v-main>
        <v-flex id="ContentApp">
          <v-row>
            <v-col cols="12" sm="12" style="margin-top:20px" align="center">
              <p class="msg-span">سيقع إنشاء الوثيقة</p>
              <!-- <p class="msg-span">{{ messagel2 }}</p>
                <p class="msg-span">{{ messagel3 }}</p> -->
            </v-col>
          </v-row>
        </v-flex>
      </v-main>
      <v-footer app bottom fixed padless color="white" id="ContentFooter">
        <v-card width="100%" height="90px">
          <v-container class="py-0">
            <v-row>
              <v-col class="mt-4" cols="12" md="12" align="left" justify="left">
                <v-btn
                  style="text-transform: unset !important"
                  class="white--text"
                  color="#165c77"
                  @click="closeWindow()"
                >
                  إلغاء
                </v-btn>

                <v-btn
                  style="text-transform: unset !important"
                  class="white--text mr-2"
                  color="#165c77"
                  @click="saveNotice()"
                >
                  إنشاء الوثيقة
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import { bus } from "../../main";
import lang from "../../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";
import moment from "moment";

export default {
  name: "F01033",
  data: () => {
    return {
      showLoaderApp: false,
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
      html: {},
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
      CF_JS_TRIBUNAL_ITEMS: [],
      CF_JS_CHAMBRE_ITEMS: [],

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
      // await this.GetUserLocal();
      await this.GeData();
      await this.GetNoticeByMailID();
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
      this.user = await NeoApi.getUserLocal();
      bus.$emit("user", this.user);
    },
    async GeData() {
      this.AttachmenListFile = await NeoApi.getAttachmentsList(
        this.$route.query.EIDS,
        this.user.data.cn
      );
      var i = 0;
      while (i < this.AttachmenListFile.length) {
        if (this.AttachmenListFile[i].Name.startsWith("COURRIERS_")) {
          this.AttachmenListFile.splice(i, 1);
        }
        i++;
      }
      let getJsonFromSPResponse = [];
      getJsonFromSPResponse = await NeoApi.getJsonFromSP(
        "sp_AP01_GetTRIBUNAL",
        []
      );
      if (getJsonFromSPResponse.Success == "true") {
        this.CF_JS_TRIBUNAL_ITEMS = getJsonFromSPResponse.Result;
      }
      getJsonFromSPResponse = [];
      getJsonFromSPResponse = await NeoApi.getJsonFromSP(
        "sp_AP01_GetCHAMBRE",
        []
      );
      if (getJsonFromSPResponse.Success == "true") {
        this.CF_JS_CHAMBRE_ITEMS = getJsonFromSPResponse.Result;
      }
    },
    async saveTraceNotice(chrono, success, message) {
      console.log(" Begin savenotice | Avocat...");
      this.trace.c01 = this.user.data.cn;
      this.trace.c02 = "إنشاء عريضة";
      this.trace.c03 = moment(Date.now()).format("LLLL");
      this.trace.c04 = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      this.trace.c05 = success;
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
      this.notice.mapping.SP_SUBJECT = "ملف المحامي";
      this.notice.ModelExist = false;
      var ValidationResult1 = await NeoApi.saveNotice(
        this.user,
        this.notice,
        "AP01",
        "F01030",
        this.html
      );
      if (ValidationResult1.success == "true") {
        console.log(ValidationResult1.success);
      } else {
        console.log(ValidationResult1.success);
      }
    },
    async saveNotice() {
      console.log("Begin savenotice");
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.showLoaderApp = true;
      this.notice.Lang = lang.locale;
      this.notice.courriers_id = this.$route.query.EIDS;
      this.notice.mapping.MailID = this.$route.query.EIDS;
      this.notice.mapping.SP_REDACTOR = this.user.data.cn;
      this.notice.mapping.SP_SIGNATORY = this.user.data.cn;
      this.notice.mapping.SP_SUBJECT = "عريضة";
      this.notice.ModelExist = true;
      this.ValidationResult = await NeoApi.saveNoticeAttachModel(
        this.user,
        this.notice,
        "AP01",
        "F01032",
        "COURRIERS_TYPE_JS_10",
        "عريضة"
      );
      if (this.ValidationResult.success == "true") {
        var chrono = "";
        var success = "true";
        var message = "";
        await this.saveTraceNotice(chrono, success, message);
        // await NeoApi.LinkMails(this.user, this.ValidationResult.message, [
        //   this.$route.query.EIDS,
        // ]);
        parent.location.href =
          Vue.prototype.$glbConfig.GLB_ELISE_URL +
          "GED/Elise/Home/document/overview?d=" +
          this.ValidationResult.message;
      } else {
        var chrono1 = "-";
        var success1 = "false";
        var message1 = this.ValidationResult.message;
        await this.saveTraceNotice(chrono1, success1, message1);
        $(".loader").hide(0);
        $("#LoaderApp").hide(0);
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
        this.FileElise = notice_json.Attachements;
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
    // Others Methods
    SaveformatDate(date) {
      if (!date) return null;
      return moment(date).format("DD/MM/YYYY");
    },
    closeWindow() {
      console.log("close window ...");
      parent.location.reload();
    },
  },
  beforeCreate() {
    //Called synchronously immediately after the instance has been initialized.
  },
  created() {
    console.log(new Date());
    // this.initialize();
    //Called synchronously after the instance is created.
  },
  beforeMount() {
    //Called right before the mounting begins: the render function is about to be called for the first time
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

<style>
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
