import Vue from "vue";
import i18n from "./i18n";
import Router from "vue-router";
import F01001 from "./vues/F01001.vue";
import CollaborateurVue from "./vues/CollaborateurVue.vue";
import EntretienVue from "./vues/EntretienVue.vue";
import Test from "./vues/Test.vue";

Vue.use(Router);
export default new Router({
  base: process.env.BASE_URL,
  // mode: "history",
  routes: [
    {
      path: "/",
      redirect: `/${i18n.locale}`,
    },
    {
      path: "/:lang",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "F01001",
          name: "F01001",
          component: F01001,
        },
        {
          path: "test",
          name: "test",
          component: Test,
        },
        
        {
          path: "Collaborateur",
          name: "Collaborateur",
          component: CollaborateurVue,
        },
        {
          path: "Entretien",
          name: "Entretien",
          component: EntretienVue,
        },
      ],
    },
  ],
});
