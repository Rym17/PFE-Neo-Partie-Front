<template>
    <v-app style="background-color: #E0E0E0 ; background-size: cover;"  scroll-target="#scrolling-techniques-2">
        <div style="padding:20px"  >
      
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
        
       
        </v-navigation-drawer> 
   
<div class="scrollable-card" width="700" >
     <v-card width="700"    class="mx-auto my-12" color="white" height="auto">
      
      <v-card-title  style="color:#165c77 ">Mon entretien trimestriel pour l'année 2023 </v-card-title>
       <v-card-text> 
        <v-form>
         

        <h2 style="color:black; font-size: medium ;"> <v-icon  color="blue darken-2"> mdi-message-text-outline </v-icon>  1. Bilan de l'année écoulée  </h2>
         <br>
        <v-card width="cover" outlined > 
            <v-col>
        <NeoTextField label="1.1 Quelle sont les principales réussites de cette année ?" required placeholder="exprimez-vous ici !"></NeoTextField> </v-col> <br>
       <v-divider></v-divider> 
         <v-col>
        <NeoTextField label="1.2 Des difficultés particulieres ont-elles été rencontrées ?" required placeholder="exprimez-vous ici !"></NeoTextField>  </v-col><br>
        </v-card>

        <br>

        <h2 style="color:black; font-size: medium ;"> <v-icon color="yellow darken-2">  mdi-star</v-icon>2. Evaluation des compétences </h2>
        <br>

         <v-card width="cover" outlined > <br>
         <v-row>
            <v-col class="col-offset">
                <NeoTextField label="2.1 Travail d'équipe " placeholder="vous pouvez laisser votre commentaire"></NeoTextField>  
            </v-col>
            <v-col class="col-offset">
                <v-rating v-model="rating" color="yellow darken-3" background-color="primary" empty-icon="$ratingFull"  half-increments hover large required></v-rating>
            </v-col>
         </v-row>
        
        <br><v-divider></v-divider> <br>

        <v-row>
            <v-col class="col-offset">
                <NeoTextField label="2.2 Engagement dans ses missions " placeholder="vous pouvez laisser votre commentaire"></NeoTextField>  
            </v-col>
            <v-col class="col-offset">
                <v-rating v-model="rating" color="yellow darken-3" background-color="primary" empty-icon="$ratingFull"  half-increments hover large required></v-rating>
            </v-col>
         </v-row>

       
        <br><v-divider></v-divider> <br>
        <v-row>
            <v-col class="col-offset">
                <NeoTextField label="2.3 Encadrement"  placeholder="vous pouvez laisser votre commentaire"></NeoTextField>  
            </v-col>
            <v-col class="col-offset">
                <v-rating v-model="rating" color="yellow darken-3" background-color="primary" empty-icon="$ratingFull"  half-increments hover large required></v-rating>
             </v-col>
         </v-row>

         <br><v-divider></v-divider> <br>
        <v-row>
            <v-col class="col-offset">
                <NeoTextField label="2.4 Maitrise des techniques de poste "  placeholder="vous pouvez laisser votre commentaire"></NeoTextField>  
            </v-col>
            <v-col class="col-offset">
                 <v-rating v-model="rating" color="yellow darken-3" background-color="primary" empty-icon="$ratingFull"  half-increments hover large required></v-rating>
            </v-col>
            
         </v-row>
        <br>
        </v-card>

   <br>
   
   <h2 style="color:black; font-size: medium ;">  <v-icon medium color="green darken-2"> mdi-book-education-outline </v-icon> 3. Formation  </h2>
         <br>
        <v-card width="cover" outlined > 
            <v-col>
        <NeoTextField label="3.1 Formation(s) suivi(s) sur l'année écoulée" required placeholder="exprimez-vous ici !" ></NeoTextField> </v-col> <br>
       <v-divider></v-divider> 
         <v-col>
        <NeoTextField label="3.2 Avez-vous besoin d'une formation pour l'année à venir ? " required placeholder="exprimez-vous ici !"></NeoTextField>  </v-col><br>
        <v-divider></v-divider> 
         <v-col>
        <NeoTextField label="3.3 Quelle formation pensez-vous pouvoir donner à vos collègues ? " required placeholder="exprimez-vous ici !"></NeoTextField>  </v-col><br>
        </v-card>

    <br>
     
   <h2 style="color:black; font-size: medium ;"> <v-icon medium color="red"> mdi-bullseye-arrow </v-icon> 4. Points sur les objectifs fixés </h2>
         <br>
        <v-card width="cover" outlined > 
          
          <v-row class="my-row">  
          <v-col cols="8" sm="6">  <h4 style="color:#165c77"> 4.1 Objectifs personnels </h4></v-col>
          <v-col cols="4" class="text-right" sm="6">

            
          <v-menu offset-y>
           <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :class="selectedOption === 'realisable' ? 'green darken-4' : 'primary'">
          {{ selectedOption === 'realisable' ? 'Réalisable' : 'À risque' }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="option in remainingOptions" :key="option.value" @click="selectOption(option.value)">
          <v-list-item-title>{{ option.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialogVisible" max-width="500px">
      <v-card>
        <v-card-title>
          {{ selectedOption === 'risque' ? 'Option à risque' : 'Autre option' }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <NeoTextField label="Motif" placeholder="Motif...." v-model="champ1"></NeoTextField>
            </v-col>
            <v-col cols="12" sm="6">
              <NeoTextField label="Commentaire"  placeholder="votre commentaire !..." v-model="champ2"></NeoTextField>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="saveData">Enregistrer</v-btn>
          <v-btn color="grey" text @click="closeDialog">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
      </v-col>
     </v-row>

         
          <v-col>
          <v-list>
          <v-list-item>
     
            {{ percentage }} %
          <v-progress-linear :value="percentage" color="primary" height="10"></v-progress-linear>
      
          </v-list-item>
          <v-list-item v-for="(option, index) in options" :key="index">
           <v-checkbox v-model="option.checked" :label="option.label"></v-checkbox>
          </v-list-item>
   
           </v-list>
          </v-col>
         <v-divider></v-divider> 
          <v-col>
        <NeoTextArea label="4.2 Vous pouvez laisser votre commentaire  " required placeholder="exprimez-vous ici !"></NeoTextArea>  </v-col><br>

        </v-card>
        <br>
   
   <h2 style="color:black; font-size: medium ;">  <v-icon medium color="purple darken-2"> mdi-shield-check-outline </v-icon> 5. Evaluation globale   </h2>
         <br>
        <v-card width="cover" outlined > 
          <br>
         <v-row>
          <v-col>
          </v-col >
            <v-rating v-model="rating" color="yellow darken-3" background-color="primary" empty-icon="$ratingFull"  half-increments hover large required></v-rating>
          <v-col >      
          </v-col>
       </v-row> <br>
       
       
         <v-col>
        <NeoTextField label="Vous pouvez laisser votre commentaire " required placeholder="exprimez-vous ici !"></NeoTextField>  </v-col><br>
        </v-card>

    <br>




        <br>
      <v-col class="text-right" >
        <v-btn color="primary" type="submit" > Publier Réponse</v-btn>
      </v-col>

        </v-form>
        </v-card-text>





        
        


    
    
</v-card>
    
</div>     
         
    
        
        
    </div>
    </v-app>
    </template>
 
<script>
   

import NeoTextArea from "../components/NeoTextArea.vue";
import NeoTextField from "../components/NeoTextField.vue";


    
    export default {
      name: "EntretienVue",
      data() {
    return {
      selectedOption: 'realisable',
      menuOptions: [
        { label: 'Réalisable', value: 'realisable' },
        { label: 'À risque', value: 'risque' },
      ],
      dialogVisible: false,
      champ1: '',
      champ2: '',
     
      knowledge: 33,
      options: [
        { label: 'Coordonner la mise à jour des documents de vente', checked: false },
        { label: 'Site web à jour', checked: false },
        { label: '5 premieres commandes passées', checked: false },
      
       
      ]
    }},
      methods: {
    onScroll() {
      console.log('Défilement détecté')
    },
    selectOption(optionValue) {
      this.selectedOption = optionValue;
      if (optionValue === 'risque') {
        this.dialogVisible = true;
      }
    },
    saveData() {
      // Effectuez ici votre logique pour enregistrer les valeurs
      console.log('Champ 1:', this.champ1);
      console.log('Champ 2:', this.champ2);
    },
    closeDialog() {
      this.dialogVisible = false;
      // Réinitialisez les valeurs des champs si nécessaire
      this.champ1 = '';
      this.champ2 = '';
    },
  },
  computed: {
    percentage() {
      const checkedCount = this.options.filter(option => option.checked).length;
      return (checkedCount / this.options.length * 100).toFixed(2);
    },
    remainingOptions() {
      return this.menuOptions.filter((option) => option.value !== this.selectedOption);
    },

  },
      components: { NeoTextField, NeoTextArea },
     
        }
        
    
</script>
<style>
.scrollable-card {
  height: 700px;
  overflow-y: auto;
}
.col-offset {
  margin-left: 12px;
}
.title{
  text-align: center;
}
.green {
    background-color: "green darken-4" !important;
    color: white !important;
  }
  
  .blue {
    background-color: "primary" !important;
    color: white !important;
  }
  .my-row {
  margin: 10px 0;
}
</style>