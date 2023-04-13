<template>
<v-app>
    <div style="padding:20px">
      
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
          > Entretiens et evaluation  </span>
        
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
        >Quitter</v-btn
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
      
        <v-list-group no-action prepend-icon="mdi-text-box-multiple-outline">
          <template v-slot:activator>
            <v-list-item-title>Dashboard</v-list-item-title>
          </template>
         <!-- <v-list-item
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
          </v-list-item>-->
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    
    <h1 style=" font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">  Nouveau collaborateur   </h1>
    <br>  <br>  
    <v-container style="height: 1500px;">
    
    <v-form>
     
    <br>
    <v-row>
        <v-col>
            <neo-text-field label="Nom" v-model="notice.data.NOM">
            </neo-text-field>
        </v-col>

        <v-col>
            <neo-text-field label="Prénom" v-model="notice.data.PRENOM">
            </neo-text-field>
        </v-col>
    </v-row>
    <v-row>
      <v-col>
           <neo-date-picker label="Date de naissance" v-model="notice.data.DATE"> 

           </neo-date-picker>

        </v-col>

      <v-col>
            <neo-text-field label="Téléphone" v-model="notice.data.PHONE">
            </neo-text-field>
        </v-col>

    </v-row>

    <v-row>
        <v-col>
            <neo-text-field label="E-mail Personnel" v-model="notice.data.MAILPERSO">
            </neo-text-field>
        </v-col>

        <v-col>
            <neo-text-field label="E-mail Profesionnel" v-model="notice.data.MAILPRO">
            </neo-text-field>
        </v-col>

    </v-row>
    <v-row>
        <v-col>
            <neo-text-field label="Login" v-model="notice.data.LOGIN">
            </neo-text-field>
        </v-col>
  
     </v-row>

    <v-row> 
        <v-col>
            <neo-select 
            label="Département" 
            v-model="notice.data.DEPARTEMENT"
            return-object
            :items="DEPARTEMENT_ITEMS"
            item-text="VALEUR"
            item-value="ID" >
            </neo-select>
            
        </v-col>
        <v-col>

          <neo-select label="Role principal" 
          v-model="notice.data.ROLEPRINC" 
          return-object
          :items="ROLEPRINC_ITEMS"
          item-text="VALEUR"
          item-value="ID" >
            </neo-select>
        </v-col>
       

      </v-row>
     
      <v-row>
        <v-col>

        <neo-check-box label="Notifier le collaborateur par mail"  v-model="notice.data.NOTIF">
        </neo-check-box>

        </v-col>
       
      </v-row>
      <v-row>
        <v-col>
         <br><br><br>
            <v-btn  
            
            color="#0b7b99"
          
            @click="saveNotice()"> Enregistrer </v-btn>
        </v-col>
    
      </v-row>
        <br> <br>
    
</v-form>
</v-container>
</div>
</v-app>
</template>
<script>
import Vue from "vue";
import { bus } from "../main";
import lang from "../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";
export default {
  name: "CollaborateurVue",
  components: {  },
  data: () => {
    return {
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