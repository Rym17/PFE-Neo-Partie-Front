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
          <v-col>  <h4 style="color:#165c77"> 4.1 Objectifs personnels </h4></v-col>
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
    
        <v-btn color="primary" type="submit">Publier Réponse</v-btn>

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
    }
  },
  computed: {
    percentage() {
      const checkedCount = this.options.filter(option => option.checked).length;
      return (checkedCount / this.options.length * 100).toFixed(2);
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
</style>