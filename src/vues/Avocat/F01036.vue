<template>
  <v-app>
    <v-flex class="global-container">
      <v-flex class="left-container" id="left-container">
        <div id="LoaderApp">
          <div class="loader" id="loader"></div>
        </div>
        <div id="ContentApp">
          <div id="div-container">
            <v-app-bar flat color="transparent">
              <v-container app class="py-0">
                <v-row cols="12" md="12">
                  <v-col cols="12" sm="1" align="left">
                    <v-btn
                      small
                      outlined
                      color="#0b7b99"
                      class="ButtonNextStyle"
                      @click="hideLeftContainer()"
                    >
                      <v-icon medium>
                        {{ arrowIcon }}
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="10" align="center"></v-col>
                  <v-col cols="12" sm="1" align="right">
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
                      <v-icon>done</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-app-bar>
          </div>

          <v-main class="pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
            <v-container class="py-0">
              <v-card flat>
                <v-form
                  id="form1"
                  ref="form1"
                  lazy-validation
                  :disabled="FormDisabled"
                >
                  <v-row class="mt-2 mx-3">
                    <v-col cols="12" md="12">
                      <v-tabs
                        v-model="tab"
                        align-with-title
                        background-color="#0a6e89"
                        dark
                        flat
                      >
                        <v-tabs-slider color="white"></v-tabs-slider>
                        <v-tab :key="1">{{
                          $t("F01036.expansion-panels.ep0101")
                        }}</v-tab>
                        <v-tab :key="2">{{
                          $t("F01036.expansion-panels.ep0102")
                        }}</v-tab>
                        <v-tab :key="3">{{
                          $t("F01036.expansion-panels.ep0103")
                        }}</v-tab>
                        <v-tab :key="4">{{
                          $t("F01036.expansion-panels.ep0104")
                        }}</v-tab>
                      </v-tabs></v-col
                    >
                  </v-row>
                  <v-tabs-items v-model="tab">
                    <v-tab-item :key="1" class="tab">
                      <v-row class="mt-2 mx-3">
                        <v-col cols="12" md="6">
                          <neo-text-field
                            v-bind:label="$t('F01036.Fields.CF_JS_NUM_AFFAIRE')"
                            v-model="notice.data.CF_JS_NUM_AFFAIRE"
                            disabled/></v-col
                        ><v-col cols="12" md="6"
                          ><neo-select
                            v-bind:label="
                              $t('F01036.Fields.CF_JS_CATEGORIE_DEMANDE')
                            "
                            v-model="notice.data.CF_JS_CATEGORIE_DEMANDE"
                            return-object
                            item-text="VALEUR"
                            item-value="ID"
                            :items="
                              $t('F01036.Items.CF_JS_CATEGORIE_DEMANDE_ITEMS')
                            "/></v-col
                      ></v-row>
                      <v-row class="mt-2 mx-3"
                        ><v-col cols="12" md="6"
                          ><neo-date-picker
                            locale="ar-TN"
                            v-bind:label="
                              $t('F01036.Fields.CF_JS_DATE_DEMANDE')
                            "
                            v-model="notice.data.CF_JS_DATE_DEMANDE"
                          />
                        </v-col>

                        <v-col cols="12" md="6"
                          ><neo-date-picker
                            locale="ar-TN"
                            v-bind:label="
                              $t('F01036.Fields.CF_JS_DATE_AUDIENCE')
                            "
                            v-model="notice.data.CF_JS_DATE_AUDIENCE"
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-2 mx-3">
                        <v-col cols="12" md="12">
                          <neo-text-field
                            v-bind:label="
                              $t('F01036.Fields.CF_JS_TITRE_DEMANDE')
                            "
                            v-model="notice.data.CF_JS_TITRE_DEMANDE"
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-2 mx-3">
                        <v-col cols="12" md="12"> </v-col>
                      </v-row>
                    </v-tab-item>
                    <v-tab-item :key="2" class="tab">
                      <TD_JS_ARGUMENTS
                        @getDataTable="TD_JS_ARGUMENTS_update"
                        :initValue="notice.TD_JS_ARGUMENTS.row"
                      ></TD_JS_ARGUMENTS>
                    </v-tab-item>
                    <v-tab-item :key="3" class="tab">
                      <TD_JS_DEMANDE_RAPPORT
                        @getDataTable="TD_JS_DEMANDE_RAPPORT_update"
                        :initValue="notice.TD_JS_DEMANDE_RAPPORT.row"
                      ></TD_JS_DEMANDE_RAPPORT>
                    </v-tab-item>
                    <v-tab-item :key="4" class="tab">
                      <TD_JS_JUSTIFICATIF
                        @getDataTable="TD_JS_JUSTIFICATIF_update"
                        :initValue="notice.TD_JS_JUSTIFICATIF.row"
                        :AttachmenListFile="AttachmenListFile"
                      ></TD_JS_JUSTIFICATIF>
                      <v-row class="mt-2 mx-3">
                        <v-col cols="12" md="12"> </v-col>
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </v-form>
              </v-card>
            </v-container>
          </v-main>
        </div>
      </v-flex>
      <v-flex class="right-container" id="right-container">
        <neo-pdf-viewer :attachments="AttachmenListFile"></neo-pdf-viewer>
      </v-flex>
    </v-flex>
  </v-app>
</template>
<script>
import Vue from "vue";
import { bus } from "../../main";
import lang from "../../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";
import moment from "moment";
import TD_JS_ARGUMENTS from "../../datatables/TD_JS_ARGUMENTS.vue";
import TD_JS_DEMANDE_RAPPORT from "../../datatables/TD_JS_DEMANDE.vue";
import TD_JS_JUSTIFICATIF from "../../datatables/TD_JS_JUSTIFICATIF.vue";
export default {
  name: "F01036",
  components: {
    TD_JS_ARGUMENTS,
    TD_JS_DEMANDE_RAPPORT,
    TD_JS_JUSTIFICATIF,
  },
  data: () => {
    return {
      arrowIcon: "arrow_back",
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
      CF_JS_TRIBUNAL_ITEMS: [],
      CF_JS_CHAMBRE_ITEMS: [],
      // FLOWCHARTS LABEL
      // Others - DATA
      AttachmenListFile: [],
      AttachmenListFileFiltred: [],
      // Tables
      itemToEdit: [],
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
    changeVisibility() {
      console.log("im heeeeeeere");
    },
    hideLeftContainer() {
      if (document.getElementById("left-container").style.width == "50%") {
        console.log("1");
        console.log(
          "hideLeftContainer left =",
          document.getElementById("left-container").style.width
        );
        document.getElementById("left-container").style.width = "100%";
        document.getElementById("right-container").style.display = "none";
        this.arrowIcon = "arrow_forward";
      } else if (
        document.getElementById("left-container").style.width == "100%" ||
        document.getElementById("left-container").style.width == ""
      ) {
        console.log("2");

        document.getElementById("right-container").style.display = "block";
        document.getElementById("left-container").style.width = "50%";
        document.getElementById("right-container").style.width = "50%";
        this.arrowIcon = "arrow_back";
      }
    },
    TD_JS_ARGUMENTS_update(DataTable) {
      this.notice.TD_JS_ARGUMENTS.row = DataTable.data;
      console.log(
        "updateDataTable | TD_JS_ARGUMENTS : ",
        this.notice.TD_JS_ARGUMENTS.row
      );
    },
    TD_JS_DEMANDE_RAPPORT_update(DataTable) {
      this.notice.TD_JS_DEMANDE_RAPPORT.row = DataTable.data;
      console.log(
        "updateDataTable | TD_JS_DEMANDE_RAPPORT : ",
        this.notice.TD_JS_DEMANDE_RAPPORT.row
      );
    },
    TD_JS_JUSTIFICATIF_update(DataTable) {
      this.notice.TD_JS_JUSTIFICATIF.row = DataTable.data;
      console.log(
        "updateDataTable | TD_JS_JUSTIFICATIF : ",
        this.notice.TD_JS_JUSTIFICATIF.row
      );
    },
    async form_Initialize() {
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
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
      await this.GetData();
      await this.GetNoticeByMailID();
      $("#ContentApp").show(0);
      $("#LoaderApp").hide(0);
    },
    async GetUser() {
      this.user = await NeoApi.getUser();
      bus.$emit("user", this.user);
    },
    async GetUserLocal() {
      this.user = await NeoApi.getUserLocal();
      bus.$emit("user", this.user);
    },
    async GetData() {
      this.AttachmenListFile = await NeoApi.getAttachmentsList(
        this.$route.query.EIDS,
        this.user.data.cn
      );
      var i = 0;
      while (i < this.AttachmenListFile.length) {
        if (this.AttachmenListFile[i].Name.startsWith("COURRIERS_") == false) {
          this.AttachmenListFileFiltred.push(this.AttachmenListFile[i]);
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

      // 'Selection BEN AROUS'
      this.notice.data.CF_JS_TRIBUNAL = this.CF_JS_TRIBUNAL_ITEMS.find(
        (el) => el.ID === "3003"
      );

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
      this.trace.c02 = "إنشاء مطلب";
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
      this.notice.mapping = {};
      this.notice.Lang = lang.locale;
      this.notice.Attachements = this.FileElise;
      this.notice.mapping.SP_REDACTOR = this.user.data.cn;
      this.notice.mapping.SP_SIGNATORY = this.user.data.cn;
      this.notice.mapping.SP_REFERENCE = "";
      this.notice.mapping.SP_COMMENTARY = "";
      this.notice.mapping.SP_DESCRIPTION = "";
      this.notice.mapping.SP_SUBJECT = "مطلب";
      this.notice.ModelExist = true;
      this.ValidationResult = await NeoApi.saveNotice(
        this.user,
        this.notice,
        "AP01",
        "F01036",
        this.html
      );
      if (this.ValidationResult.success == "true") {
        var chrono = this.ValidationResult.metadata[0].Value;
        var success = "نعم";
        var message = "-";
        await this.saveTraceNotice(chrono, success, message);
        await NeoApi.LinkMails(this.user, this.ValidationResult.message, [
          this.$route.query.EIDS,
        ]);
        parent.location.href =
          Vue.prototype.$glbConfig.GLB_ELISE_URL +
          "GED/Elise/Home/document/overview?d=" +
          this.ValidationResult.message;
      } else {
        var chrono1 = "-";
        var success1 = "لا";
        var message1 = this.ValidationResult.message;
        await this.saveTraceNotice(chrono1, success1, message1);
        $(".loader").hide(0);
        $("#LoaderApp").show(0);
      }
    },
    async updatenotice() {
      console.log("Begin updatenotice");
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      console.log("updatenotice | notice : ", this.notice);
      console.log("updatenotice | user : ", this.user);
      console.log("updatenotice | FileElise : ", this.FileElise);
      this.notice.Lang = lang.locale;
      this.notice.Attachements = this.FileElise;
      this.notice.mapping.SP_SUBJECT = "مطلب محامي";

      console.log("updatenotice | Attachements : ", this.notice.Attachements);
      // this.notice.Table_Data = this.Table_Data;
      this.ValidationResult = await NeoApi.modifieNotice(
        this.user,
        this.notice,
        "AP01",
        "F01036",
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
        this.notice.NOTICE_DOSSIER = notice_json;
        this.FileElise = notice_json.Attachements;
        console.log("GetNoticeByMailID | notice : ", this.notice);
        this.notice.data.CF_JS_NUM_AFFAIRE = notice_json.data.CF_JS_NUM_AFFAIRE;
        bus.$emit("SetFileList", this.FileElise);
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
      document.getElementById("right-container").style.direction = "initial";

      // document.getElementById("footer-container").style.direction = "ltr";
    } else if (lang.locale == "ar") {
      this.$vuetify.rtl = true;
      document.getElementById("div-container").style.direction = "ltr";
      document.getElementById("right-container").style.direction = "ltr";
      document.getElementById("div-container").style.overFlow = "hidden";

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
html {
  font-size: 20px !important;
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

.left-container {
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
}
.right-container {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  z-index: -1 !important;
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
