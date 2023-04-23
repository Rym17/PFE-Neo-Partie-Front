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
      width="200"
     
    >
    
    <v-divider></v-divider>
    <br><br>
    <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title> Rym Charni </v-list-item-title>
      </v-list-item>

   
      <v-divider></v-divider>
      <br>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
         
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> 

    <v-card width="cover" >
        <v-img
          height="100px"
          src="https://www.lifewithpulmonaryfibrosis.com/de/sites/default/files/styles/hero_image_lg_viewport_2x/public/Setting%20personal%20goals.jpg?itok=sHWIgZWH"
        >
      
        </v-img>
    </v-card>


   
    <!-- DEBUT CODE STEPPER -->
    <v-stepper
    v-model="e6" vertical >

      <v-form>
<!-------------- LE CONTENU DE LA PREMIERE ETAPE------------>
        <v-stepper-step
            :complete="e6 > 1"
            step="1"
        >
        Informations Principales 
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            height="250px"
          
          >
           <br>
           <v-row>
              <v-col cols="12"
                    sm="6"
                    md="6">
                 <neo-text-field label="Titre de la campagne" v-model="notice.data.TITRE">
                 </neo-text-field> 
               </v-col>
          
                <v-col cols="12"
                    sm="6"
                    md="6">
                  <neo-select 
                     label="Catégorie de la campagne" 
                     v-model="notice.data.TYPE"
                     return-object
                     :items="TYPE_ITEMS"
                     item-text="VALEUR"
                     item-value="ID" >
            </neo-select>
               </v-col>
           </v-row>
           <br> <br>
           <v-row>
             <v-col cols="12"
                    sm="6"
                    md="6">
               <h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;"> Préparation du collaborateur </h2>
                <neo-date-picker label="La préparation doit etre faite avant le :" v-model="notice.data.ECHEANCE_COLLAB"> 

                </neo-date-picker>
              </v-col>
             
              <v-col cols="12"
                    sm="6"
                    md="6">
                  <h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;">Réalisation de l'entretien par le responsable </h2>
          
                <neo-date-picker label="La réalisation doit etre faite avant le :" v-model="notice.data.ECHEANCE_RESPONS"> 

                </neo-date-picker>
              </v-col>
            <!--  <v-col cols="12"
                    sm="6"
                    md="4">
                <v-radio-group
              v-model="RADIO"
              column
                   >

                <neo-radio label="Collaborateur"> </neo-radio>
                
                <neo-radio label="Manager"> </neo-radio>
               
                <neo-radio label="Manager du manager"> </neo-radio>
               
                <neo-radio label="Responsable département"> </neo-radio>
              
                </v-radio-group>
              </v-col> -->
           </v-row>
          </v-card>
          <v-btn  class="mr-9"
        color="primary"
        @click="e6 = 2"
      >
        Continuer
      </v-btn>
      <v-btn color="blue-grey lighten-4">
       Annuler
      </v-btn>
    </v-stepper-content>

<!---------- LE CONTENU DE LA DEUXIEME ETAPE------------->

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
    Populations 
    </v-stepper-step>

    <v-stepper-content step="2">
          <v-card
            class="mb-12"
            height="250px"
          >
         <h2 style="font-family:'SegoeUI', Tahoma, Geneva, Verdana, sans-serif ; color:midnightblue ; font-size: medium ;">Population à évaluer </h2>
          <br>
          <v-row> 
        <v-col cols="12"
                    sm="6"
                    md="4">
            <neo-select 
            label="Département" 
            v-model="notice.data.DEPARTEMENT"
            return-object
            :items="DEPARTEMENT_ITEMS"
            item-text="VALEUR"
            item-value="ID" >
            </neo-select>
            
        </v-col>
        <v-col cols="12"
                    sm="6"
                    md="3">

          <neo-select label="Role Principal" 
          v-model="notice.data.ROLEPRINC" 
          return-object
          :items="ROLEPRINC_ITEMS"
          item-text="VALEUR"
          item-value="ID" >
            </neo-select>
        </v-col>
         <v-col cols="12"
                    sm="6"
                    md="4">

          <neo-select label="Collaborateur Spécifique" 
          v-model="notice.data.COLLABSPEC" 
          return-object
          :items="COLLABSPEC_ITEMS"
          item-text="VALEUR"
          item-value="ID" >
            </neo-select>
        </v-col>
       
      </v-row>
      <br>
       <v-row > 
        <v-col style="margin-left: 20px;">
        <neo-check-box label="Tous les collaborateurs"  v-model="TOUS">
         </neo-check-box> 
       <br>
       <v-alert
      icon="mdi-shield-lock-outline"
      border="left"
      outlined
      text
      type="info"
    >
      Tous les collaborateurs seront concernés par l'entretien
    </v-alert>
         </v-col>
        </v-row>  
    </v-card>
         <v-btn
            color="primary"
            @click="e6 = 3"
          >
            Continuer
          </v-btn>
          
          <v-btn  color="blue-grey lighten-5">
            Annuler
          </v-btn>
  </v-stepper-content>
 
<!---------- LE CONTENU DE LA TROISIEME ETAPE------------->
<v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Configuration du formulaire
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View setup instructions
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>


 </v-form>
</v-stepper>
 <br><br><br>
    
    
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
      items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],


        e6: 1,
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