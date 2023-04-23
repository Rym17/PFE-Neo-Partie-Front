<template>
<v-dialog v-model="dialog" width="600" hide-overlay>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon
          medium-icon
          color="white"
        > 
        mdi-account-plus
        </v-icon>
        
         Ajouter nouveau  </v-btn>
    </template>

    <v-card>
            <v-card-title class="text-h5"> Nouveau collaborateur  </v-card-title>
            <v-card-text>
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
         <v-col>
             <neo-text-field label="Manager" v-model="notice.data.MANAGER">
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
     
       </v-form>
      </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-2" text @click="saveNotice()"> Enregistrer </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false"> Réinitialiser </v-btn>
            </v-card-actions>
    </v-card>

    </v-dialog>



</template>
  <script>
import Vue from "vue";
import { bus } from "../main";
import lang from "../i18n.js";
import NeoApi from "@/plugins/neoapi.js";
import $ from "jquery";
export default {
  name: "NouvCollab",
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
                MANAGER: ""
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