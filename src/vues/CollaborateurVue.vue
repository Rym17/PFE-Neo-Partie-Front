<template>
<v-app style="background-color: #E0E0E0 ; background-size: cover;" >
    <div style="padding:20px">
  
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
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
          > Entretiens et evaluation  </span>
        
      </v-toolbar-title>
      <v-app-bar-nav-icon class="d-block d-md-none" />
      <v-spacer />
    
      <!---right part -->
     
      <v-btn
        color="primary"
        depressed
        class="myBtn white--text font-weight-bold text-capitalize"
        small
        @click="$router.go(-1)"
        >Quitter</v-btn
      >
    </v-app-bar> 

    <v-navigation-drawer
      :right="orientation"
      v-model="Sidebar_drawer"
      color="white"
      mobile-breakpoint="960"
      clipped
      app
      id="main-sidebar"
      width="240"
     
    >
    
    
   
      <v-divider></v-divider>
      <br> <br><br>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon >
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }} </v-list-item-title>
          </v-list-item-content>

          <v-menu offset-y open-on-hover v-if="item.subitems && item.subitems.length > 0">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        
        <v-list>
          <v-list-item v-for="subitem in item.subitems" :key="subitem.title" link>
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
        </v-list-item>
      </v-list>


      <template v-slot:prepend>
        <v-list-item two-line>
         

          <v-list-item-content>
            <v-list-item-title><v-icon> mdi-gavel</v-icon> Administration RH</v-list-item-title>
            <v-list-item-subtitle>Activé</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <br><br><br><br><br><br><br><br><br><br>

      

    </v-navigation-drawer> 
    <br><br>
  
  
<CrudCollab/>


  
   
 
</div>
</v-app>
</template>
<script>
import Vue from "vue";
import { bus } from "../main";
import lang from "../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";

import CrudCollab from "../components/CrudCollab.vue";


//import TD_JS_CLIENTS from "../datatables/TD_JS_CLIENTS.vue";


export default {
  name: "CollaborateurVue",
  components: { CrudCollab},
  data: () => {
    return {
    
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard'},
         // { title: 'Mon compte', icon: 'mdi-account-box' },
          { title: 'Collaborateurs', icon: 'mdi-account-group-outline' ,
          subitems: [
            { title: 'Liste collaborateurs' },
            { title: 'Nouveau collaborateur' }
              ]},
          { title: 'Campagnes', icon: 'mdi-text-box-multiple-outline' ,
          subitems: [
            { title: 'Liste Campagnes' },
            { title: 'Créer Campagne' }
              ]},
          //{ title: 'Objectifss', icon: 'mdi-bullseye-arrow ' },
        ],
       
        notice:{
            mapping: {
          SP_REDACTOR: "",
          SP_SIGNATORY: "",
          SP_REFERENCE: "",
          SP_SUBJECT: "",
          SP_COMMENTARY: "",
          SP_DESCRIPTION: "",
        },
            data:{
                NOM:"",
                PRENOM:"",
                PHONE: "",
                DATE: "",
                MAILPERSo:"",
                MAILPRO: "",
                LOGIN: ""
            }
        },
        DEPARTEMENT_ITEMS: [
        { ID: "1", VALEUR: "Marketing" },
        { ID: "2", VALEUR: "Finance" },
        { ID: "3", VALEUR:  "Informatique"},
       
      ],

      ROLEPRINC_ITEMS: [
        { ID: "1", VALEUR: "Collaborateur" },
        { ID: "2", VALEUR: "Manager" },
        { ID: "3", VALEUR: "Super manager"},
        { ID: "4", VALEUR: "Administrateur" },
        { ID: "5", VALEUR: "Responsable RH" },
       
      ],
      
      NOTIF: false,
   

    }},
    method:{
     
        async GetUserLocal() {
      this.user = await NeoApi.getUserLocal();
      bus.$emit("user", this.user);
    },
        async saveNotice() {
      console.log("Begin savenotice");
      $("#ContentApp").hide(0);
      $("#LoaderApp").show(0);
      this.notice.Lang = lang.locale;
      this.notice.Attachements = this.FileElise;
      this.notice.mapping.SP_REDACTOR = this.user.data.cn;
      this.notice.mapping.SP_SIGNATORY = this.user.data.cn;
      this.notice.mapping.SP_SUBJECT = ""
      this.html =""
        
      this.ValidationResult = await NeoApi.saveNotice(
        this.user,
        this.notice,
        "AP01",
        "F01020",
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
    }
    }
</script>
<style >

</style>