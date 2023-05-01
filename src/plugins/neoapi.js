import Axios from "axios";
import lang from "../i18n.js";
import Vue from "vue";
export default {
  data: () => {
    return {};
  },
  async GetNoticeByMailIDAdmin(FormID) {
    console.log(".... NeoApi.GetNoticeByMailID - ");
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetNoticeByMailID?mailID=" +
        FormID
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.GetNoticeByMailID - Error : ", error.response);
      });
    console.log(".... NeoApi.GetNoticeByMailID - Result : ", result);
    return result;
  },
  async saveNoticeAdmin(user, notice, ApplicationID, FormID, html) {
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };
    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);
    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,

      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      UserInfo: user,
      html: html,
    };
    console.log(".... NeoApi.saveNotice - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F01001/SaveNoticeAdmin",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.saveNotice - Error: ", error.response);
      });
    console.log(".... NeoApi.saveNotice - Result : ", result);
    return result;
  },
  async getFormInfo(formEID, mailID) {
    var json_POST = [
      {
        Key: "Form_EID",
        Value: formEID,
      },
      {
        Key: "Application_EID",
        Value: Vue.prototype.$glbConfig.GLB_APP_ID,
      },
      {
        Key: "MailID",
        Value: mailID,
      },
    ];
    console.log(".... NeoApi.getFormInfo - Request : ", json_POST);
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + formEID + "/GetFormInfo",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.getFormInfo - Error : ", error.response);
      });
    console.log(".... NeoApi.getFormInfo - Result : ", result);
    return result;
  },
  // getNotice (Input : FormInfo, mailID => Output : NoticeInfo)
  async getNotice(formInfo, mailID) {
    var result = [];
    var json_POST = [
      {
        Key: "FormID",
        Value: formInfo.form_id,
      },
      {
        Key: "ApplicationID",
        Value: formInfo.application_id,
      },
      {
        Key: "MailID",
        Value: mailID,
      },
    ];
    console.log(".... NeoApi.getNotice - Request : ", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        formInfo.form_externalid +
        "/GetNotice",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.getNotice - Error : ", error.responser);
      });
    console.log(".... NeoApi.getNotice - Result : ", result);
    return result;
  },
  async getStatusFromCP(formEID, mailID) {
    var result = [];
    var user = [];
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_ELISE_URL +
        "GED" +
        "/Elise/api/connection/user"
    )
      .then((response) => (user = response.data))
      .catch(function(err) {
        //this.ShowLoader = false;
        console.log(err);
        console.log(err);
      });
    if (typeof mailID != undefined || mailID != null) {
      var metadatas = [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "MailID",
          Value: mailID,
        },
      ];

      await Axios.post(
        Vue.prototype.$glbConfig.GLB_API_URL + formEID + "/GetStatusFormFromCP",
        metadatas
      )
        .then((response) => (result = response.data))
        .catch((error) => {
          console.log(".... NeoApi.getStatusFromCP - Error: ", error.response);
        });

      console.log(".... NeoApi.getStatusFromCP - Result : ", result);
      return result;
    }
  },
  async getTaskInformations(formEID, mailID) {
    var result = [];
    var user = [];
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_ELISE_URL +
        "GED" +
        "/Elise/api/connection/user"
    )
      .then((response) => (user = response.data))
      .catch(function(err) {
        //this.ShowLoader = false;
        console.log(err);
      });

    var post = {
      Uid_User: user.data.id, //"3c3bb711053e0347ad66ac5ee63e80bb",
      Uid_Service: user.data.services[0].id, //"LEXICON_00000000",
      Instance: user.data.instanceName, //"GED",
      UserLogin: user.data.login, //"AdminGED",
      Courrier_Id: mailID,
    };
    var data = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + formEID + "/TaskInformation",
      post
    )
      .then((response) => (data = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.getTaskInformations - Error : ",
          error.response
        );
      });

    console.log(".... NeoApi.getTaskInformations - data : ", data);
    result = data.responseTaskInformation;

    console.log(".... NeoApi.getTaskInformations - Result : ", result);
    return result;
  },
  makeTree: function(nodes, parentId) {
    return nodes
      .filter((node) => node.parent_id === parentId)
      .reduce(
        (tree, node) => [
          ...tree,
          {
            ...node,
            children: this.makeTree(nodes, node.id),
          },
        ],
        []
      );
  },
  async getUser() {
    var result = [];
    console.log(".... NeoApi.getUser - Begin ....: ");

    console.log("CONFURL", Vue.prototype.$glbConfig);
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_ELISE_URL + "GED/Elise/api/connection/user"
    )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(".... NeoApi.getUser - Error: ", error.response);
      });
    console.log(".... NeoApi.getUser - Result: ", result);
    return result;
  },
  async getUserLocal() {
    let result = {
      data: {
        id: "98fbe9879bf7b84f9eec8fea2d31ea41",
        displayName: "jShare",
        login: "jShare",
        cn: "jShare",
        mail: "",
        instanceName: "GED",
        preferences: null,
        preferredLanguage: "FR",
        policies: {
          isAllowedToChangePortal: true,
          isAllowedToManageAbsence: true,
          hasDefaultLoginToModernPortal: true,
          canAccessToGrc: false,
          canAccessToGeneralAdministration: false,
          canAccessToContacts: true,
          canAccessToWorkflowAdministration: false,
          canAccessToSeparatorPrint: false,
          canAccessToMaintenance: false,
          canAccessToDocumentGeneration: false,
          canManageConfidentialFile: false,
          canAccessToDistribute: false,
          canShowMailHistory: true,
          canShowHistory: true,
          canAccessAdminGuide: false,
          canAddPersonalDashboard: true,
          canShowPreparationProcess: false,
          canManageWorkspaces: true,
          deleteTaskParameter: 1,
          updateTaskParameter: 1,
          canPermanentlyDeleteFiles: false,
          forceFormAuthentication: true,
          isAllowedToModifyAvatar: true,
          isAllowedToRequestTask: true,
          isAllowedToReserveDocument: true,
          isAllowedToPrintLabel: true,
          isAllowedToPrintDocument: true,
          isAllowedToLinkDocumentCreationWidgetToPigeonhole: false,
          isAllowedToRequestTaskAsService: false,
          isAllowedToAccessActivities: true,
          isAllowedToManageTasks: true,
          printBarCodeDateType: 0,
          notifyContributorOption: 4,
          isAllowedClosingLinkedOutgoingDocuments: 3,
          deactivateTransferredTask: 4,
          canAccessAdminAutomatedActions: false,
          canAccessFlowchartAllServices: false,
          canAccessFlowchartUserSubServices: false,
          canAccessFlowchartAllUsers: false,
          canAccessFlowchartUserServices: false,
        },
        eliseUrl: "https://parjdev.elisecloud.tn/elise",
        baseUrl: "https://parjdev.elisecloud.tn",
        documentationUrl:
          "https://parjdev.elisecloud.tn/elise/docs/userguide/{locale}/default.htm",
        isCf4InDebugMode: false,
        licenses: [
          {
            license: {
              application: "ELISE",
              instance: "ged",
              availableLicenses: 30,
              usedLicenses: 29,
              description: 'Licences nommées pour l\'application "Elise"',
            },
            isActive: true,
          },
        ],
        isAdministrator: false,
        intranetAuthenticationMode: "FORM",
        services: [
          {
            id: "LEXICON_00000023",
            isDefault: true,
            grade: 0,
            initials: "",
            identificationPath: "",
            isOrganizationUnit: false,
            uid: "LEXICON_00000023",
            label: "Tribunal",
            type: 1,
            email: null,
            isExternal: false,
            delegationId: null,
            isUnknown: false,
            absenceStartDate: null,
            absenceEndDate: null,
            isAutomaton: false,
            isEnabled: false,
          },
          {
            id: "LEXICON_00000000",
            isDefault: false,
            grade: 0,
            initials: "",
            identificationPath: "",
            isOrganizationUnit: false,
            uid: "LEXICON_00000000",
            label: "وزارة العدل",
            type: 1,
            email: null,
            isExternal: false,
            delegationId: null,
            isUnknown: false,
            absenceStartDate: null,
            absenceEndDate: null,
            isAutomaton: false,
            isEnabled: false,
          },
        ],
        feature: {
          takeChargeOf: true,
          markAsSent: true,
          allTaskAreValidationStep: true,
          newTaskRequest: true,
          isProcessingWorkflowEnabledForOutMails: false,
          taskInProgress: true,
          diffusion: false,
          interEntitySecureMessage: false,
          userDocumentTemplate: true,
          elisePrintLabel: false,
          otherDiffusion: false,
          localDocumentation: true,
          historyDetails: true,
          entityManagement: true,
        },
        entityId: "LEXICON_00000000",
        rootServiceId: "LEXICON_00000000",
        documentExportLimit: 200,
      },
    };
    return result;
  },
  async getUserLocal_AVOCAT() {
    let result = {
      data: {
        id: "7433d060f75ea540857f13b4a903fb7f",
        displayName: "AdminGED",
        login: "AdminGED",
        cn: "AdminGED",
        mail: "",
        instanceName: "GED",
        preferences: null,
        preferredLanguage: "AR-TN",
        policies: {
          isAllowedToManageAbsence: true,
          canAccessToGeneralAdministration: true,
          canAccessToContacts: true,
          canAccessToWorkflowAdministration: true,
          canManageConfidentialFile: false,
          hasAccessToDistribution: false,
          canShowMailHistory: true,
          canShowHistory: true,
          canAccessToDocumentDiscussion: true,
          userMessagesAreImportant: false,
          canAccessAdminGuide: true,
          canAddPersonalDashboard: true,
          canShowPreparationProcess: false,
          canManageWorkspaces: true,
          deleteTaskParameter: 1,
          updateTaskParameter: 1,
          canPermanentlyDeleteFiles: true,
          forceFormAuthentication: true,
          isAllowedToModifyAvatar: true,
          isAllowedToRequestTask: true,
          isAllowedToReserveDocument: true,
          isAllowedToPrintLabel: true,
          isAllowedToPrintDocument: true,
          isAllowedToDeleteDocument: true,
          isAllowedToLinkDocumentCreationWidgetToPigeonhole: true,
          isAllowedToRequestTaskAsService: false,
          isAllowedToAccessActivities: true,
          isAllowedToManageTasks: true,
          printBarCodeDateType: 0,
          notifyContributorOption: 4,
          actionsAfterDiffuseProfile: 1,
          isAllowedClosingLinkedOutgoingDocuments: 3,
          fileEditionOptions: 2,
          deactivateTransferredTask: 4,
          printLabelDuringDocumentsCreation: 4,
          isAllowedToPrintLabelsPerDocument: false,
          numberLabelsToPrintPerDocument: 1,
          defaultInterface: 1,
          canAccessAdminAutomatedActions: true,
          canAccessFlowchartAllServices: true,
          canAccessFlowchartUserSubServices: true,
          canAccessFlowchartAllUsers: true,
          canAccessFlowchartUserServices: false,
          canAccessSharedDynamicView: true,
          canAccessDashboardsAdministration: true,
          canAccessWorkspacesAdministration: true,
          canAccessFeaturesAdministration: true,
          canProcessTaskWithoutRestrictionWorkspace: true,
          canShareDynamicView: true,
          canAdministrateUserSignatureImage: true,
          canAccessUserSignatureImage: true,
          canFreeDocuments: true,
          canAccessLowCodeAdministration: true,
        },
        eliseUrl: "https://avocats.elisecloud.tn/elise",
        baseUrl: "https://avocats.elisecloud.tn",
        documentationUrl:
          "https://avocats.elisecloud.tn/elise/docs/userguide/{locale}/default.htm",
        isCf4InDebugMode: false,
        licenses: [
          {
            license: {
              application: "ELISE",
              instance: "ged",
              availableLicenses: 100,
              usedLicenses: 4,
              description: 'Licences nommées pour l\'application "Elise"',
            },
            isActive: true,
          },
        ],
        isAdministrator: true,
        intranetAuthenticationMode: "FORM",
        services: [
          {
            id: "LEXICON_00000000",
            isDefault: true,
            grade: 0,
            initials: "",
            identificationPath: "",
            isOrganizationUnit: false,
            uid: "LEXICON_00000000",
            label: "وزارة العدل",
            type: 1,
            email: null,
            isExternal: false,
            delegationId: null,
            isUnknown: false,
            absenceStartDate: null,
            absenceEndDate: null,
            isAutomaton: false,
            isEnabled: false,
            isRemoved: false,
          },
        ],
        feature: {
          takeChargeOf: true,
          markAsSent: true,
          allTaskAreValidationStep: true,
          newTaskRequest: true,
          isProcessingWorkflowEnabledForOutMails: false,
          taskInProgress: true,
          interEntitySecureMessage: true,
          userDocumentTemplate: true,
          elisePrintLabel: false,
          otherDiffusion: true,
          localDocumentation: true,
          historyDetails: false,
          entityManagement: true,
        },
        entityId: "LEXICON_00000000",
        rootServiceId: "LEXICON_00000000",
        documentExportLimit: 200,
        pigeonholeDocumentsCreationLimit: 50,
        wmlLanguage: "AR-TN",
        mainServiceId: "LEXICON_00000000",
      },
    };
    return result;
  },
  async GetContactExterneOrga(user) {
    var result = [];

    var json_POST = user;

    console.log(".... NeoApi.GetContactExterneOrga - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/GetContactExterneOrga",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.GetContactExterneOrga - Error: ",
          error.response
        );
      });

    console.log(".... NeoApi.GetContactExterneOrga - Result : ", result);
    return result;
  },
  async GetNoticeFromCourrier(GetNoticeFromCourrierParam) {
    var result = null;
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/GetNoticeFromCourrier",
      GetNoticeFromCourrierParam
    )
      .then((response) => {
        console.log("GetNoticeFromCourrier - Success : ", response.data);
        result = response.data;
      })
      .catch((error) => {
        console.log(
          ".... NeoApi.GetNoticeFromCourrier - Error : ",
          error.response
        );
      });
    console.log(".... NeoApi.GetNoticeFromCourrier - Result : ", result);
    return result;
  },
  async GetEnumCP(champPerso) {
    console.log(".... NeoApi.GetEnumCP - ", champPerso);
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetEnumCP?champPerso=" +
        champPerso
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.GetEnumCP - Error : ", error.response);
      });
    console.log(".... NeoApi.GetEnumCP - Result : ", result);
    return result;
  },
  async getJsonFromSP(StoredProcedureName, Qualifier) {
    var json_POST = {
      StoredProcedureName: StoredProcedureName,
      SqlParameterList: Qualifier,
      // [
      //   {
      //     ParameterName: "qualifier",
      //     SqlDbType: "22",
      //     Value: Qualifier,
      //   },
      // ],
    };
    console.log(".... NeoApi.getJsonFromSP : ", json_POST);
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/GetJsonFromSP",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.getJsonFromSP - Error : ", error.response);
      });
    console.log(".... NeoApi.getJsonFromSP - Result : ", result);
    return result;
  },
  async GetNoticeByMailID(mailID) {
    console.log(".... NeoApi.GetNoticeByMailID - ");
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetNoticeByMailID?mailID=" +
        mailID
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.GetNoticeByMailID - Error : ", error.response);
      });
    console.log(".... NeoApi.GetNoticeByMailID - Result : ", result);
    return result;
  },
  async GetNoticeByMailIDHTML(mailID) {
    console.log(".... NeoApi.GetNoticeByMailIDHTML - ");
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetNoticeByMailIDHTML?mailID=" +
        mailID
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.GetNoticeByMailIDHTML - Error : ",
          error.response
        );
      });
    console.log(".... NeoApi.GetNoticeByMailIDHTML - Result : ", result);
    return result;
  },
  async saveNotice(user, notice, ApplicationID, FormID, html) {
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };
    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);
    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,

      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      UserInfo: user,
      html: html,
    };
    console.log(".... NeoApi.saveNotice - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/SaveNotice",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.saveNotice - Error: ", error.response);
      });
    console.log(".... NeoApi.saveNotice - Result : ", result);
    return result;
  },
  async saveNoticeAttachModel(
    user,
    notice,
    ApplicationID,
    FormID,
    ModelName,
    pjNummber
  ) {
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };
    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);
    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,
      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      ModelName: ModelName,
      pjNummber: pjNummber,
      UserInfo: user,
      html: {},
    };
    console.log(".... NeoApi.SaveNoticeAttachModel - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/SaveNoticeAttachModel",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.SaveNoticeAttachModel - Error: ",
          error.response
        );
      });
    console.log(".... NeoApi.SaveNoticeAttachModel - Result : ", result);
    return result;
  },
  async sendNotice(user, notice, ApplicationID, FormID, html) {
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };
    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);
    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,

      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      UserInfo: user,
      html: html,
    };
    console.log(".... NeoApi.SendNotice - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL2 + "F0001/SaveNotice",
      json_POST
    )
      .then(function(response) {
        // eslint-disable-next-line no-console
        console.log(response.data);
        console.log(".... NeoApi.SendNotice - Response status", response);
        if (response.status == 200) {
          result = response.data;
        } else {
          result = {
            success: "false",
            message: "منصة jShare غير متاحة حالياً",
            metadata: null,
          };
        }
      })
      .catch((error) => {
        console.log(".... NeoApi.SendNotice - Error: ", error.response);
      });
    console.log(".... NeoApi.SendNotice - Result : ", result);
    return result;
  },
  async sendNoticeWithDynamicUrl(
    user,
    notice,
    ApplicationID,
    FormID,
    html,
    dynamicUrl
  ) {
    console.log(".... NeoApi.sendNoticeWithDynamicUrl - url", dynamicUrl);
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };
    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);
    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,

      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      UserInfo: user,
      html: html,
    };
    console.log(".... NeoApi.sendNoticeWithDynamicUrl - Request", json_POST);
    console.log(
      ".... NeoApi.sendNoticeWithDynamicUrl - dynamicUrl",
      dynamicUrl + "F0001/SaveNotice"
    );

    await Axios.post(dynamicUrl + "jshareAPI/F0001/SaveNotice", json_POST)
      .then(function(response) {
        // eslint-disable-next-line no-console
        console.log(response.data);
        console.log(
          ".... NeoApi.sendNoticeWithDynamicUrl - Response status",
          response
        );
        // if (response.status == 200) {
        //   result = response.data;
        // } else {
        //   result = {
        //     success: "false",
        //     message: "منصة jShare غير متاحة حالياً",
        //     metadata: null,
        //   };
        // }
      })
      .catch((error) => {
        console.log(
          ".... NeoApi.sendNoticeWithDynamicUrl - Error: ",
          error.response
        );
      });
    console.log(".... NeoApi.sendNoticeWithDynamicUrl - Result : ", result);
    return result;
  },
  async getCourrirsAndUpdateCustomFieldByRef(
    user,
    FormID,
    valueSearch,
    cpToUpdate,
    valueToUpdate,
    MappingName,
    RackCode
  ) {
    var result = [];

    var json_POST = {
      formID: FormID,
      valueSearch: valueSearch,
      cpToUpdate: cpToUpdate,
      valueToUpdate: valueToUpdate,
      UserInfo: user,
      MappingName: MappingName,
      RackCode: RackCode,
    };
    console.log(
      ".... NeoApi.getCourrirsAndUpdateCustomFieldByRef - Request",
      json_POST
    );
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/getCourrirsAndUpdateCustomFieldByRef",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.getCourrirsAndUpdateCustomFieldByRef - Error: ",
          error.response
        );
      });
    console.log(
      ".... NeoApi.getCourrirsAndUpdateCustomFieldByRef - Result : ",
      result
    );
    return result;
  },
  async LinkMails(user, courrierID, courriersIdToLink) {
    var result = [];

    var json_POST = {
      UserInfo: user,
      courrierID: courrierID,
      courriersIdToLink: courriersIdToLink,
    };
    console.log(".... NeoApi.LinkMails - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/LinkMails",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.LinkMails - Error: ", error.response);
      });

    console.log(".... NeoApi.LinkMails - Result : ", result);
    return result;
  },
  async getAttachmentsListWithStream(eids, login) {
    var result = [];
    console.log("METHOD : getAttachmentsList HAS BEGUN");

    var EIPS_Param = eids;
    var UserLogin = login;
    console.log("METHOD : getAttachmentsList : EIPS_Param", EIPS_Param);
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetAttachWithStream?EIDS=" +
        EIPS_Param +
        "&UserLogin=" +
        UserLogin
    )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(".... NeoApi.getAttachmentsList - Error: ", error.response);
      });
    console.log(".... NeoApi.getAttachmentsList - Result: ", result);
    return result;
  },
  async getAttachmentsList(eids, login) {
    var result = [];
    console.log("METHOD : getAttachmentsList HAS BEGUN");

    var EIPS_Param = eids;
    var UserLogin = login;
    console.log("METHOD : getAttachmentsList : EIPS_Param", EIPS_Param);
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "F0001/GetAttach?EIDS=" +
        EIPS_Param +
        "&UserLogin=" +
        UserLogin
    )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(".... NeoApi.getAttachmentsList - Error: ", error.response);
      });
    console.log(".... NeoApi.getAttachmentsList - Result: ", result);
    return result;
  },
  async modifieNotice(user, notice, ApplicationID, FormID, html) {
    var result = [];
    var modif = {
      uid: user.data.id,
      cn: user.data.displayName,
      datetime: Date.now(),
    };

    notice.Creation.uid = user.data.id;
    notice.Creation.cn = user.data.displayName;
    notice.Creation.datetime = Date.now();
    notice.Modification.push(modif);

    var json_POST = {
      metadatas: [
        {
          Key: "Instance",
          Value: user.data.instanceName, // "GED",
        },
        {
          Key: "UserLogin",
          Value: user.data.login, //"AdminGED",
        },
        {
          Key: "SeparateDocuments",
          Value: "0",
        },
        {
          Key: "Lang",
          Value: lang.locale,
        },
      ],
      ApplicationID: ApplicationID,
      FormID: FormID,

      DocumentGeneration: true,
      pdfGeneration: true,
      notice: {
        notice_id: 0,
        form_id: FormID,
        application_id: ApplicationID,
        notice_json: JSON.stringify(notice),
        datecreation: Date.now(),
        dateupdate: null,
        userCreation: user.data.login, //"AdminGED",
        userUpdate: null,
      },
      UserInfo: user,
      html: html,
    };
    console.log(".... NeoApi.updateNotice - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/UpdateNotice",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.updateNotice - Error: ", error.response);
      });

    console.log(".... NeoApi.updateNotice - Result : ", result);
    return result;
  },
  async GetEnumCPONAT(champPerso) {
    console.log(".... NeoApi.GetEnumCP - ", champPerso);
    var result = [];
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "api/GetEnumCP?champPerso=" +
        champPerso
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.GetEnumCP - Error : ", error.response);
      });
    console.log(".... NeoApi.GetEnumCP - Result : ", result);
    return result;
  },
  async GetEvents(user) {
    // console.log(".... NeoApi.GetEvents - user : ", user);
    var result = [];
    // console.log(".... NeoApi.GetEvents - CONFURL : ", Vue.prototype.$glbConfig);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "api/GetEvent",
      user
    )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(".... NeoApi.GetEvents - Error: ", error.response);
      });
    // console.log(".... NeoApi.GetEvents - Result: ", result);
    return result;
  },
  async addEvent(user, event, mailID) {
    var result = [];
    var json_POST = {
      UserInfo: user,
      eventCalandar: event,
      courrierID: mailID,
    };
    console.log(".... NeoApi.addEvent - Request", json_POST);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "api/CreateUpdateEvent",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.addEvent - Error: ", error.response);
      });

    console.log(".... NeoApi.addEvent - Result : ", result);
    return result;
  },
  async GetMailLastUpdateDate(instance, userLogin, mailID) {
    var result = [];
    await Axios.get(
      Vue.prototype.$glbConfig.GLB_API_URL +
        "/GetMailLastUpdateDate?instance=" +
        instance +
        "&userLogin=" +
        userLogin +
        "&MailID=" +
        mailID
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.GetMailLastUpdateDate - Error : ",
          error.response
        );
      });

    console.log(".... NeoApi.GetMailLastUpdateDate - result : ", result);
    return result;
  },
  async DeleteFileFromElise(
    mailId,
    documentId,
    isAttachmentConfidential,
    deleteHistory,
    dateUpdate
  ) {
    var result = [];
    var date = new Date(
      new Date(dateUpdate).toString().split("GMT")[0] + "UTC"
    ).toISOString();
    var utcVar = new Date()
      .toString()
      .split("GMT")[1]
      .split(" ")[1]
      .split("+")[1];

    var utc = utcVar.slice(0, utcVar.length - 1);
    var dateF = date.slice(0, date.length - 1).split(".")[0] + "+" + utc;
    console.log(dateF);
    var json_POST = {
      documentId: mailId,
      documentModificationDate: dateF,
      isAttachmentConfidential: isAttachmentConfidential,
      deleteHistory: deleteHistory,
    };
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_ELISE_URL +
        "/GED/elise/api/attachment/delete/" +
        documentId,
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(
          ".... NeoApi.DeleteFileFromElise - Error : ",
          error.response
        );
      });

    console.log(".... NeoApi.DeleteFileFromElise - result : ", result);
    return result;
  },
  async DuplicateNotice(NewUserLogin, FormID, user, mailID) {
    console.log(".... NeoApi.DuplicateNotice - ");
    var result = [];
    var json_POST = {
      formID: FormID,
      NewUserLogin: NewUserLogin,
      mailID: mailID,
      UserInfo: user,
    };
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_API_URL + "F0001/DuplicateNotice",
      json_POST
    )
      .then((response) => (result = response.data))
      .catch((error) => {
        console.log(".... NeoApi.DuplicateNotice - Error : ", error.response);
      });
    console.log(".... NeoApi.DuplicateNotice - Result : ", result);
    return result;
  },
  async getEntityInfo(user) {
    var result = [];
    console.log(".... NeoApi.getEntityInfoUser - Begin ....: ");

    console.log("CONFURL", Vue.prototype.$glbConfig);
    await Axios.post(
      Vue.prototype.$glbConfig.GLB_ELISE_URL + "jshareAPI/F0001/GetEntityInfo",
      user
    )
      .then((response) => {
        result = response.data;
      })
      .catch((error) => {
        console.log(".... NeoApi.getEntityInfo - Error: ", error.response);
      });
    console.log(".... NeoApi.getEntityInfo - Result: ", result);
    return result;
  },
};
