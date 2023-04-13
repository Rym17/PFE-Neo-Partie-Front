<template>
  <div>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="#4a4a4a"
      height="40px"
      style="height : 40px !important"
    >
      <v-toolbar-title class="align-center d-flex">
        <img height="30px" src="../assets/logoelise2.png" />
        <v-divider
          class="mx-1"
          vertical
          style="height: 0px; width:0%;"
        ></v-divider>
        <span
          class="myBtn   text-capitalize"
          style="font-size:17px;color: white;"
          >{{ $t("NeoBar.header") }}</span
        >
      </v-toolbar-title>
      <v-app-bar-nav-icon class="d-block d-md-none" />
      <v-spacer />
      <!---right part -->
       
      <v-btn
        color="#4a4a4a"
        depressed
        class="myBtn white--text font-weight-bold text-capitalize"
        small
        @click="$router.go(-1)"
        >{{ $t("NeoBar.btn_quitter") }}</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer
      :right="orientation"
      v-model="Sidebar_drawer"
      color="white"
      mobile-breakpoint="960"
      clipped
      mini-variant-width="70"
      app
      id="main-sidebar"
      width="300"
    >
      <v-list dense nav>
        <v-row class="mt-2 mx-3">
          <v-col cols="12" md="12"> </v-col>
        </v-row>
        <!---USer Area -->
        <!-- <div>
          <v-list-item two-line class="px-0">
            <v-list-item-avatar>
              <img src="../assets/pro.png" style="cursor: pointer;" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="cursor: pointer;">
                {{ user.data.displayName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div> -->
        <!---USer Area -->
        <!---Sidebar Items -->
        <v-list-group no-action prepend-icon="mdi-text-box-multiple-outline">
          <template v-slot:activator>
            <v-list-item-title>الإعدادات</v-list-item-title>
          </template>
          <v-list-item
            color="black"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            active-class="bg-active success white--text"
            link
          >
            <v-list-item-icon>
              <v-icon color="#165c77">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- <v-list-group no-action prepend-icon="mdi-text-box-multiple-outline">
          <template v-slot:activator>
            <v-list-item-title>الإعدادات 2</v-list-item-title>
          </template>
          <v-list-item
            color="black"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            active-class="bg-active success white--text"
            link
          >
            <v-list-item-icon>
              <v-icon color="#165c77">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group> -->
        <!---Sidebar Items -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import NeoApi from "@/plugins/neoapi.js";
import lang from "../i18n.js";
export default {
  name: "Sidebar",

  data: () => ({
    user: [],
    Sidebar_drawer: true,
    orientation: false,
    items: [
      {
        title: "توزيع العمل بالدوائر",
        icon: "mdi-file-document-outline",
        to: "F02001",
      },

      {
        title: "الدوائر في المحكمة",
        icon: "mdi-file-document-outline",
        to: "F02002",
      },
      {
        title: "تصنيف الدوائر",
        icon: "mdi-file-document-outline",
        to: "F02003",
      },
      {
        title: "تركيبة الهيئة",
        icon: "mdi-archive-outline",
        to: "F02005",
      },
      {
        title: "المراجع",
        icon: "mdi-archive-outline",
        to: "F02004",
      },
      {
        title: "توزيع العمل على القضاة",
        icon: "mdi-archive-outline",
        to: "F02006",
      },
    ],
  }),
  methods: {
    async getUser() {
      // this.user = await NeoApi.getUser();
      this.user = await NeoApi.getUserLocal();
    },
  },
  async mounted() {
    if (lang.locale == "ar") {
      this.orientation = true;
      document.getElementById("div-container").style.direction = "initial";
    } else {
      this.orientation = false;
      document.getElementById("div-container").style.direction = "ltr";
    }
    await this.getUser();
  },
};
</script>
<style lang="scss">
@import "../styles/NeoLayout.scss";
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  // .v-navigation-drawer__border {
  //   display: none;
  // }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
  .bg-active {
    background-color: #d2effb !important;
    color: black !important;
  }
  .bg-active2 {
    background-color: #d2effb !important;
    color: red !important;
  }
}
</style>
