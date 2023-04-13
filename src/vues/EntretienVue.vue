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
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- DEBUT CODE STEPPER -->
    <v-stepper v-model="e1">

      <v-form>


      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
        Informations Principales 
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Populations 
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step step="3">
          Formulaire
        </v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
<!-------------- LE CONTENU DE LA PREMIERE ETAPE------------>
         
  
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            height="600px"
          >
           <br>
           <v-row>
              <v-col>
                 <neo-text-field label="Titre de la campagne" v-model="notice.data.TITRE">
                 </neo-text-field> 
               </v-col>
 
                <v-col>
                  <neo-select 
                     label="Type de la campagne" 
                     v-model="notice.data.TYPE"
                     return-object
                     :items="TYPE_ITEMS"
                     item-text="VALEUR"
                     item-value="ID" >
            </neo-select>
               </v-col>
           </v-row>
           <br> <br>  <br>
           <h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;"> Préparation du collaborateur </h2>
           <br>
          
           <v-row>
             <v-col>
                <neo-date-picker label="La préparation doit etre faite avant le :" v-model="notice.data.ECHEANCE_COLLAB"> 

                </neo-date-picker>
              </v-col>
              <v-col></v-col>
           </v-row>
           <br> <br>  <br>
           <h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;">Réalisation de l'entretien par le responsable </h2>
           <br>
          
           <v-row>
             <v-col>
                <neo-date-picker label="La réalisation doit etre faite avant le :" v-model="notice.data.ECHEANCE_RESPONS"> 

                </neo-date-picker>
              </v-col>
              <v-col>
                <v-radio-group
              v-model="RADIO"
              column
                   >

                <neo-radio label="Collaborateur"> </neo-radio>
                
                <neo-radio label="Manager"> </neo-radio>
               
                <neo-radio label="Manager du manager"> </neo-radio>
               
                <neo-radio label="Responsable département"> </neo-radio>
              
                </v-radio-group>
              </v-col>
           </v-row>

            <br>  <br>      

            <v-row  justify="space-around">
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continuer
          </v-btn>
  
          <v-btn color="blue-grey lighten-5">
            Annuler
          </v-btn>
        </v-row>
        </v-card>
        </v-stepper-content>
     

 <!---------- LE CONTENU DE LA DEUXIEME ETAPE------------->
     
  
        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            height="600px"
          >
          <br><h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;">Population à évaluer </h2>
          <br>
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
         <v-col>

          <neo-select label="Collaborateur spécifique" 
          v-model="notice.data.COLLABSPEC" 
          return-object
          :items="COLLABSPEC_ITEMS"
          item-text="VALEUR"
          item-value="ID" >
            </neo-select>
        </v-col>
      </v-row>
              <br><br>
      <v-row>
        <v-col>
          <v-btn
            color="cyan darken-3">
           TOUS
          </v-btn>
         </v-col>
      </v-row>
    <br><br><br><br>
          <v-row  justify="space-around">
            
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continuer
          </v-btn>
          
          <v-btn  color="blue-grey lighten-5">
            Annuler
          </v-btn>
        </v-row>
          </v-card>
        </v-stepper-content>








  <!---------- LE CONTENU DE LA TROISIEME ETAPE------------->       
  
        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>
  
          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continuer
          </v-btn>
  
          <v-btn color="blue-grey lighten-5">
            Annuler
          </v-btn>
          
        </v-stepper-content>
      </v-stepper-items>
    </v-form>
    </v-stepper>




   









    
    <br>  <br>  
    <v-container style="height: 1500px;">
    
    <v-form>
     
    <br>
   
    
   
     
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
  name: "EntretienVue",
  components: {  },
  data: () => {
    return {
        e1: 1,
        Requise: true,
        
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
                RADIO:"",
                LOGIN: ""
            }
        },
        DEPARTEMENT_ITEMS: [
        { ID: "1", VALEUR: "Marketing" },
        { ID: "2", VALEUR: "Finance" },
        { ID: "3", VALEUR: "Informatique"},
       
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