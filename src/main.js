import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import i18n from "./i18n";
import ElementUI from "element-ui";
import NeoDatePicker from "./components/NeoDatePicker.vue";
import NeoTimePicker from "./components/NeoTimePicker.vue";
import NeoSelect from "./components/NeoSelect.vue";
import NeoComboBox from "./components/NeoComboBox.vue";

import NeoExpansionPanelHeader from "./components/NeoExpansionPanelHeader.vue";
import NeoTextField from "./components/NeoTextField.vue";
import NeoStepperHeader from "./components/NeoStepperHeader.vue";
import NeoListView from "./components/NeoListView.vue";
import NeoFileUploader from "./components/NeoFileUploader.vue";
import NeoTextArea from "./components/NeoTextArea.vue";
import NeoRadio from "./components/NeoRadio.vue";
import NeoCheckBox from "./components/NeoCheckBox.vue";
import NeoPdfViewer from "./components/NeoPdfViewer.vue";
import NeoAutoComplete from "./components/NeoAutoComplete.vue";
import NeoImageUploader from "./components/NeoImageUploader.vue";
import NeoFlowchart from "./components/NeoFlowchart.vue";
import NeoEditor from "./components/NeoEditor.vue";
import NeoLayout from "./components/NeoLayout.vue";
import NeoBar from "./components/NeoBar.vue";
import NeoBarAvocat from "./components/NeoBarAvocat.vue";
import NeoUploader from "./components/NeoUploader.vue";
import NeoAttachFile from "./components/NeoAttachFile.vue";
import NeoSearchField from "./components/NeoSearchField.vue";
import NeoSearchFieldNew from "./components/NeoSearchFieldNew.vue";
import NeoSearchFieldF01047 from "./components/NeoSearchFieldF01047.vue";
import NeoUpload from "./components/NeoUpload.vue";
import Stepper from "./components/Stepper.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";

Vue.use(CKEditor);
Vue.use(ElementUI);
Vue.component("Stepper", Stepper);
Vue.component("NeoSelect", NeoSelect);
Vue.component("NeoComboBox", NeoComboBox);
Vue.component("NeoDatePicker", NeoDatePicker);
Vue.component("NeoTimePicker", NeoTimePicker);
Vue.component("NeoExpansionPanelHeader", NeoExpansionPanelHeader);
Vue.component("NeoTextField", NeoTextField);
Vue.component("NeoStepperHeader", NeoStepperHeader);
Vue.component("NeoListView", NeoListView);
Vue.component("NeoFileUploader", NeoFileUploader);
Vue.component("NeoTextArea", NeoTextArea);
Vue.component("NeoRadio", NeoRadio);
Vue.component("NeoCheckBox", NeoCheckBox);
Vue.component("NeoPdfViewer", NeoPdfViewer);
Vue.component("NeoAutoComplete", NeoAutoComplete);
Vue.component("NeoImageUploader", NeoImageUploader);
Vue.component("NeoUpload", NeoUpload);
Vue.component("NeoFlowchart", NeoFlowchart);
Vue.component("NeoEditor", NeoEditor);
Vue.component("NeoLayout", NeoLayout);
Vue.component("NeoBar", NeoBar);
Vue.component("NeoBarAvocat", NeoBarAvocat);
Vue.component("NeoAttachFile", NeoAttachFile);
Vue.component("NeoUploader", NeoUploader);
Vue.component("NeoSearchField", NeoSearchField);
Vue.component("NeoSearchFieldNew", NeoSearchFieldNew);
Vue.component("NeoSearchFieldF01047", NeoSearchFieldF01047);
Vue.config.productionTip = false;
Vue.prototype.$blogName = "LogRocket";
export const bus = new Vue();
router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = "fr";
  }
  i18n.locale = language;
  next();
});

// A Remplacer

fetch(process.env.BASE_URL + "config.json")
  .then((response) => response.json())
  .then((config) => {
    Vue.prototype.$glbConfig = config;
    new Vue({
      router,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  });
